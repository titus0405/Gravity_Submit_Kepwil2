import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ContentService } from '@core/services';
import { SectionHeadingComponent, ContentCardComponent, ServiceCardComponent, ToolCardComponent, BannerCarouselComponent } from '@shared/components';

@Component({
  selector: 'bpjs-home',
  standalone: true,
  imports: [RouterLink, SectionHeadingComponent, ContentCardComponent, ServiceCardComponent, ToolCardComponent, BannerCarouselComponent],
  animations: [
    trigger('staggerFade', [
      transition(':enter', [
        query('.stagger-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(80, [animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
        ]),
      ]),
    ]),
    ],
  template: `
    <!-- Banner Carousel -->
    <bpjs-banner-carousel />

    <!-- Quick Actions -->
    <section class="bg-neutral-50 -mt-1">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 md:pb-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          @for (action of quickActions; track action.label) {
            <a [routerLink]="action.route"
               class="flex items-center gap-3 p-3 md:p-4 rounded-xl bg-white border border-neutral-200 hover:border-primary-200 hover:shadow-md transition-all duration-200 group">
              <div class="shrink-0 flex items-center justify-center">
                <img [src]="action.icon" [alt]="action.label" class="w-10 h-10 md:w-12 md:h-12 object-contain">
              </div>
              <span class="text-xs md:text-sm font-medium text-neutral-700 group-hover:text-primary-700 transition-colors">{{ action.label }}</span>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Health e-Services -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Layanan Digital" subtitle="Akses layanan BPJS Kesehatan secara online" viewAllLink="/layanan" />
        <div class="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          @for (service of content.eServices(); track service.id) {
            <bpjs-service-card [name]="service.name" [icon]="service.icon" [route]="service.route" />
          }
        </div>
      </div>
    </section>

    <!-- Conditions & Medications -->
    <section class="bg-neutral-50 py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Kondisi & Obat" subtitle="Informasi kondisi kesehatan dan panduan obat" viewAllLink="/kondisi" />
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          @for (condition of content.conditions(); track condition.id) {
            <bpjs-content-card [title]="condition.title" [description]="condition.description" [imageUrl]="condition.imageUrl" [route]="condition.route" />
          }
        </div>
      </div>
    </section>

    <!-- Well-being & Lifestyle + Spotlight Sidebar -->
    <section class="bg-gradient-to-br from-neutral-300 via-neutral-100 to-neutral-300 pb-10 md:pb-16 relative">
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(circle at 1px 1px, #333 1px, transparent 0); background-size: 24px 24px"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid lg:grid-cols-4 gap-8">
          <div class="lg:col-span-3">
            <bpjs-section-heading title="Gaya Hidup Sehat" subtitle="Tips dan panduan hidup sehat untuk Anda dan keluarga" viewAllLink="/gaya-hidup" />
            <div class="grid md:grid-cols-3 gap-5">
              @for (article of content.articles(); track article.id) {
                <bpjs-content-card [title]="article.title" [description]="article.summary" [imageUrl]="article.imageUrl" [route]="article.route" [category]="article.category" />
              }
            </div>
          </div>
          <div class="lg:col-span-1">
            <div class="rounded-2xl p-6 h-full flex flex-col justify-between relative overflow-hidden bg-white">
              <img src="assets/images/carecenter.png" alt="" class="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none">
              <div class="relative z-10">
                <p class="text-primary-600 text-xs font-medium uppercase tracking-wider mb-2">Info Penting</p>
                <h3 class="font-display text-lg font-bold mb-2 text-neutral-900">Cek Iuran BPJS Anda</h3>
                <p class="text-sm text-neutral-600">Pastikan tagihan iuran Anda tidak menunggak untuk menjaga status kepesertaan tetap aktif.</p>
              </div>
              <a routerLink="/layanan/tagihan"
                 class="relative z-10 inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                Cek Sekarang
                <span class="material-icons-round text-base">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Programmes -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Program Unggulan" subtitle="Berbagai program kesehatan untuk peserta BPJS Kesehatan" viewAllLink="/program" />
        <div class="grid md:grid-cols-3 gap-6">
          @for (program of content.programmes(); track program.id) {
            <a [routerLink]="program.route"
               class="group block bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="aspect-[16/9] bg-neutral-100 overflow-hidden">
            <img [src]="program.imageUrl" [alt]="program.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          </div>
              <div class="p-5">
                <h3 class="font-display font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{{ program.title }}</h3>
                <p class="mt-2 text-sm text-neutral-600 line-clamp-3 leading-relaxed">{{ program.description }}</p>
                <span class="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:gap-2 transition-all">
                  Pelajari Lebih Lanjut
                  <span class="material-icons-round text-base">arrow_forward</span>
                </span>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Pandawa - 5 Transformasi Kesehatan -->
    <section class="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 py-10 md:py-16 overflow-hidden">
      <img src="assets/images/pandawa.png" alt="" class="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 pointer-events-none opacity-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-10">
          <span class="inline-block px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm mb-3">Transformasi</span>
          <h2 class="font-display text-2xl md:text-3xl font-bold text-white">Pandawa - 5 Transformasi Kesehatan</h2>
          <p class="mt-2 text-primary-100 max-w-2xl mx-auto">Lima pilar transformasi untuk mewujudkan sistem kesehatan yang lebih baik bagi seluruh rakyat Indonesia</p>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          @for (item of pandawa; track item.id) {
            <div class="text-center p-5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 transition-all duration-300">
              <div class="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold"
                   [style.background-color]="item.color">
                {{ item.number }}
              </div>
              <h4 class="font-semibold text-white text-sm">{{ item.title }}</h4>
              <p class="mt-1 text-xs text-primary-200 leading-relaxed">{{ item.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Support & Tools -->
    <section class="bg-neutral-50 py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Alat Bantu & Sumber Daya" subtitle="Kalkulator, skrining, dan informasi biaya kesehatan" viewAllLink="/alat" />
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (tool of content.tools(); track tool.id) {
            <bpjs-tool-card [title]="tool.title" [description]="tool.description" [icon]="tool.icon" [route]="tool.route" />
          }
        </div>
      </div>
    </section>

    <!-- Latest News -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Berita Terkini" subtitle="Informasi terbaru seputar BPJS Kesehatan dan program JKN" viewAllLink="/berita" />
        <div class="flex flex-wrap gap-2 mb-6">
          @for (tab of newsTabs; track tab.key; let i = $index) {
            <button (click)="activeNewsTab.set(i)"
                    class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                    [class.bg-primary-600]="activeNewsTab() === i"
                    [class.text-white]="activeNewsTab() === i"
                    [class.bg-neutral-100]="activeNewsTab() !== i"
                    [class.text-neutral-600]="activeNewsTab() !== i"
                    [class.hover:bg-neutral-200]="activeNewsTab() !== i">
              {{ tab.label }}
            </button>
          }
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          @for (news of newsItems; track news.id) {
            <a [routerLink]="news.route"
               class="group block bg-white rounded-2xl overflow-hidden border border-neutral-200 hover:border-primary-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div class="aspect-[16/9] bg-neutral-100 overflow-hidden">
                <img [src]="news.imageUrl" [alt]="news.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              </div>
              <div class="p-4">
                <span class="text-xs text-primary-600 font-medium">{{ news.category }}</span>
                <h4 class="mt-1 font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors text-sm leading-snug line-clamp-2">{{ news.title }}</h4>
                <p class="mt-1 text-xs text-neutral-500">{{ news.date }}</p>
              </div>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Layanan Informasi -->
    <section class="bg-neutral-50 py-10 md:py-16 relative overflow-hidden">
      <img src="assets/images/carecenter.png" alt="" class="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-auto opacity-50 pointer-events-none">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <bpjs-section-heading title="Layanan Informasi" subtitle="Informasi lengkap seputar layanan BPJS Kesehatan" />
        <div class="grid md:grid-cols-3 gap-6">
          @for (item of infoServices; track item.id) {
            <a [routerLink]="item.route"
               class="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-200 hover:border-primary-200 shadow-sm hover:shadow-md transition-all duration-300 group">
              <div class="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center mb-4 group-hover:bg-primary-100 transition-colors">
                <span class="material-icons-round text-2xl text-primary-600">{{ item.icon }}</span>
              </div>
              <h4 class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{{ item.title }}</h4>
              <p class="mt-1 text-sm text-neutral-500 line-clamp-2">{{ item.description }}</p>
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Testimoni" subtitle="Apa kata peserta BPJS Kesehatan tentang layanan kami" />
        <div class="grid md:grid-cols-3 gap-6">
          @for (testi of testimonials; track testi.id) {
            <div class="p-6 rounded-2xl bg-neutral-50 border border-neutral-200">
              <div class="flex items-center gap-1 text-accent-400 mb-3">
                @for (star of [1,2,3,4,5]; track star) {
                  <svg class="w-4 h-4" [class.text-accent-400]="star <= testi.rating" [class.text-neutral-300]="star > testi.rating" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                }
              </div>
              <p class="text-sm text-neutral-600 leading-relaxed italic">"{{ testi.quote }}"</p>
              <div class="mt-4 flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span class="material-icons-round text-primary-600 text-sm">person</span>
                </div>
                <div>
                  <p class="text-sm font-medium text-neutral-900">{{ testi.name }}</p>
                  <p class="text-xs text-neutral-500">{{ testi.role }}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Galeri -->
    <section class="bg-neutral-50 py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Galeri" subtitle="Dokumentasi kegiatan dan program BPJS Kesehatan" viewAllLink="/galeri" />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          @for (photo of gallery; track photo.id) {
            <a [routerLink]="photo.route"
               class="group block aspect-square rounded-xl overflow-hidden bg-neutral-200">
              <img [src]="photo.imageUrl" [alt]="photo.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
            </a>
          }
        </div>
      </div>
    </section>

    <!-- Video Terbaru -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Video Terbaru" subtitle="Tonton video informasi dan edukasi BPJS Kesehatan" viewAllLink="/video" />
        <div class="grid md:grid-cols-3 gap-6">
          @for (video of videos; track video.id) {
            <div class="rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 group cursor-pointer">
              <a [routerLink]="video.route" class="block aspect-video bg-neutral-800 relative overflow-hidden">
                <img [src]="video.thumbnail" [alt]="video.title" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg class="w-5 h-5 text-primary-700 ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/></svg>
                  </div>
                </div>
              </a>
              <div class="p-4">
                <h4 class="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">{{ video.title }}</h4>
                <p class="mt-1 text-xs text-neutral-500">{{ video.duration }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Download App Banner -->
    <section class="relative overflow-hidden bg-gradient-to-r from-primary-800 via-primary-700 to-primary-600">
      <div class="absolute inset-0 opacity-5">
        <div class="absolute -top-20 -right-20 w-60 h-60 bg-white rounded-full blur-3xl"></div>
        <div class="absolute -bottom-10 -left-10 w-80 h-80 bg-accent-400 rounded-full blur-3xl"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div class="text-center lg:text-left lg:max-w-lg">
            <span class="inline-block px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm mb-3">Aplikasi Mobile</span>
            <h2 class="font-display text-2xl md:text-3xl font-bold text-white">Mobile JKN</h2>
            <p class="mt-2 text-primary-100 leading-relaxed">Akses informasi dan layanan BPJS Kesehatan kapan saja, di mana saja melalui genggaman Anda.</p>
            <div class="flex flex-wrap gap-4 mt-4 justify-center lg:justify-start">
              <span class="inline-flex items-center gap-1.5 text-sm text-white/80">
                <svg class="w-4 h-4 text-green-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Cek Tagihan
              </span>
              <span class="inline-flex items-center gap-1.5 text-sm text-white/80">
                <svg class="w-4 h-4 text-green-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Cari Faskes
              </span>
              <span class="inline-flex items-center gap-1.5 text-sm text-white/80">
                <svg class="w-4 h-4 text-green-300 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Info Peserta
              </span>
            </div>
            <div class="flex items-center gap-2 mt-6 justify-center lg:justify-start">
              <a href="https://apps.apple.com/ru/app/mobile-jkn/id1237601115?l=en" target="_blank" rel="noopener noreferrer">
                <img src="assets/images/button-app.png" alt="App Store" class="h-10 w-auto hover:opacity-80 transition-opacity">
              </a>
              <a href="https://play.google.com/store/apps/details?id=app.bpjs.mobile&hl=en&gl=US" target="_blank" rel="noopener noreferrer">
                <img src="assets/images/button-google.png" alt="Google Play" class="h-10 w-auto hover:opacity-80 transition-opacity">
              </a>
            </div>
          </div>
          <!-- Phone Mockup -->
          <div class="shrink-0 hidden lg:block w-[250px]">
            <img src="assets/images/phone-mockup.png" alt="Mobile JKN App" class="w-full h-auto">
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-neutral-50 rounded-3xl p-8 md:p-12">
          <div class="flex flex-col md:flex-row items-center gap-8">
            <div class="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-primary-100 flex items-center justify-center">
              <span class="material-icons-round text-4xl md:text-5xl text-primary-600">mail</span>
            </div>
            <div class="flex-1 text-center md:text-left">
              <h3 class="font-display text-xl md:text-2xl font-bold text-neutral-900">Jangan Lewatkan Informasi Penting!</h3>
              <p class="mt-1 text-neutral-600">Dapatkan info kesehatan, tips, dan pengumuman terbaru dari BPJS Kesehatan.</p>
            </div>
            <div class="w-full md:w-auto">
              <div class="flex flex-col sm:flex-row gap-3">
                <input type="email" placeholder="Masukkan email Anda"
                       class="h-12 px-5 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all w-full sm:w-64">
                <button class="h-12 px-6 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors">
                  Langganan
                </button>
              </div>
              <p class="mt-2 text-xs text-neutral-400">Dengan mendaftar, Anda menyetujui <a routerLink="/kebijakan-privasi" class="text-primary-600 hover:underline">Kebijakan Privasi</a> kami.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ / Stats Section -->
    <section class="bg-neutral-50 py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="font-display text-2xl md:text-3xl font-bold text-neutral-900">BPJS Kesehatan dalam Angka</h2>
            <p class="mt-2 text-neutral-600">Capaian dan statistik program Jaminan Kesehatan Nasional</p>
            <div class="grid grid-cols-2 gap-6 mt-8">
              <div class="p-4 bg-white rounded-xl border border-neutral-200">
                <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-primary-600">groups</span>
                </div>
                <span class="block font-display text-2xl font-bold text-neutral-900">272 Juta</span>
                <span class="text-xs text-neutral-500">Peserta JKN Aktif</span>
              </div>
              <div class="p-4 bg-white rounded-xl border border-neutral-200">
                <div class="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-accent-600">local_hospital</span>
                </div>
                <span class="block font-display text-2xl font-bold text-neutral-900">23.000+</span>
                <span class="text-xs text-neutral-500">Faskes Tingkat 1</span>
              </div>
              <div class="p-4 bg-white rounded-xl border border-neutral-200">
                <div class="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-secondary-600">home_health</span>
                </div>
                <span class="block font-display text-2xl font-bold text-neutral-900">10.000+</span>
                <span class="text-xs text-neutral-500">RS & Klinik Rujukan</span>
              </div>
              <div class="p-4 bg-white rounded-xl border border-neutral-200">
                <div class="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center mb-3">
                  <span class="material-icons-round text-pink-600">pharmacy</span>
                </div>
                <span class="block font-display text-2xl font-bold text-neutral-900">12.000+</span>
                <span class="text-xs text-neutral-500">Apotek JKN</span>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h3 class="font-display text-lg font-bold text-neutral-900 mb-4">Pertanyaan Umum</h3>
            <div class="space-y-3">
              @for (faq of faqs; track faq.q) {
                <div class="border border-neutral-200 rounded-xl overflow-hidden">
                  <button (click)="toggleFaq($index)"
                          class="flex items-center justify-between w-full px-4 py-3.5 text-left text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors">
                    {{ faq.q }}
                    <span class="material-icons-round text-neutral-400 transition-transform"
                          [class.rotate-180]="openFaqIndex() === $index">expand_more</span>
                  </button>
                  @if (openFaqIndex() === $index) {
                    <div class="px-4 pb-3.5 text-sm text-neutral-600 leading-relaxed">
                      {{ faq.a }}
                    </div>
                  }
                </div>
              }
            </div>
            <a routerLink="/bantuan" class="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
              Lihat semua FAQ
              <span class="material-icons-round text-base">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Grafik Kepesertaan -->
    <section class="bg-white py-10 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <bpjs-section-heading title="Grafik Kepesertaan" subtitle="Data dan statistik peserta JKN dari waktu ke waktu" />
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h3 class="font-display text-lg font-bold text-neutral-900 mb-4">Peserta JKN per Segmen</h3>
            <div class="space-y-4">
              @for (item of chartData.jknSegments; track item.label) {
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-neutral-700">{{ item.label }}</span>
                    <span class="font-semibold text-neutral-900">{{ item.value }}</span>
                  </div>
                  <div class="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000" [style.width.%]="item.percentage" [style.background-color]="item.color"></div>
                  </div>
                </div>
              }
            </div>
          </div>
          <div class="bg-neutral-50 rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h3 class="font-display text-lg font-bold text-neutral-900 mb-4">Fasilitas Kesehatan JKN</h3>
            <div class="space-y-4">
              @for (item of chartData.faskes; track item.label) {
                <div>
                  <div class="flex justify-between text-sm mb-1">
                    <span class="text-neutral-700">{{ item.label }}</span>
                    <span class="font-semibold text-neutral-900">{{ item.value }}</span>
                  </div>
                  <div class="w-full h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div class="h-full rounded-full transition-all duration-1000" [style.width.%]="item.percentage" [style.background-color]="item.color"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Floating AI Assistant -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      @if (chikaOpen()) {
        <div class="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-80 overflow-hidden animate-fade-in-up">
          <div class="bg-gradient-to-r from-primary-600 to-primary-700 p-4 flex items-center gap-3">
            <img src="assets/images/Ai Robot Vector Art.svg" alt="Chika" class="w-10 h-10 shrink-0">
            <div>
              <p class="text-white font-semibold text-sm">Chika</p>
              <p class="text-white/70 text-xs">AI Assistant BPJS Kesehatan</p>
            </div>
            <button (click)="chikaOpen.set(false)" class="ml-auto text-white/60 hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div class="p-4 h-64 overflow-y-auto space-y-3 bg-neutral-50">
            <div class="flex items-start gap-2">
              <img src="assets/images/Ai Robot Vector Art.svg" alt="Chika" class="w-7 h-7 shrink-0 mt-0.5">
              <div class="bg-white rounded-xl rounded-tl-none p-3 shadow-sm text-sm text-neutral-700">
                Halo! Saya Chika, asisten virtual BPJS Kesehatan. Ada yang bisa saya bantu?
              </div>
            </div>
            <div class="flex items-start gap-2 justify-end">
              <div class="bg-primary-600 text-white rounded-xl rounded-tr-none p-3 text-sm">
                Bagaimana cara daftar BPJS?
              </div>
            </div>
            <div class="flex items-start gap-2">
              <img src="assets/images/Ai Robot Vector Art.svg" alt="Chika" class="w-7 h-7 shrink-0 mt-0.5">
              <div class="bg-white rounded-xl rounded-tl-none p-3 shadow-sm text-sm text-neutral-700">
                Anda dapat mendaftar melalui aplikasi Mobile JKN, website resmi, atau datang ke kantor BPJS Kesehatan terdekat dengan membawa KTP dan KK.
              </div>
            </div>
          </div>
          <div class="p-3 border-t border-neutral-200 flex gap-2">
            <input type="text" placeholder="Ketik pesan..." class="flex-1 h-10 px-4 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30">
            <button class="w-10 h-10 rounded-xl bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 0l-7 7m7-7l7 7"/></svg>
            </button>
          </div>
        </div>
      }
      <button (click)="toggleChika()"
              class="block w-auto h-auto p-0 border-0 bg-transparent cursor-pointer">
        @if (chikaOpen()) {
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        } @else {
          <img src="assets/images/Ai Robot Vector Art.svg" alt="Chika" class="w-32 h-auto" style="background:transparent !important">
        }
      </button>
    </div>
  `,
})
export class HomeComponent {
  readonly content = inject(ContentService);
  readonly openFaqIndex = signal<number | null>(null);
  readonly chikaOpen = signal(false);

  readonly quickActions = [
    { label: 'Cek Tagihan', icon: 'assets/icons/icon-financing.svg', route: '/layanan/tagihan' },
    { label: 'Info Faskes', icon: 'assets/icons/icon-screening.svg', route: '/layanan/faskes' },
    { label: 'Pendaftaran', icon: 'assets/icons/icon-appointments.png', route: '/layanan/daftar' },
    { label: 'Pusat Bantuan', icon: 'assets/icons/icon-calculator.svg', route: '/bantuan' },
  ];

  readonly activeNewsTab = signal(0);

  readonly chartData = {
    jknSegments: [
      { label: 'PBI APBN', value: '96,8 Juta', percentage: 36, color: '#00A14C' },
      { label: 'PBI APBD', value: '42,1 Juta', percentage: 15, color: '#1D4580' },
      { label: 'PPU', value: '67,5 Juta', percentage: 25, color: '#F0A92E' },
      { label: 'PBPU/Mandiri', value: '38,2 Juta', percentage: 14, color: '#8B5CF6' },
      { label: 'Bukan Pekerja', value: '27,4 Juta', percentage: 10, color: '#EC242A' },
    ],
    faskes: [
      { label: 'Puskesmas', value: '10.200+', percentage: 42, color: '#00A14C' },
      { label: 'Klinik', value: '6.500+', percentage: 27, color: '#1D4580' },
      { label: 'Dokter Praktik', value: '4.300+', percentage: 18, color: '#F0A92E' },
      { label: 'RS & Rujukan', value: '3.000+', percentage: 13, color: '#8B5CF6' },
    ],
  };

  readonly newsTabs = [
    { key: 'semua', label: 'Semua' },
    { key: 'nasional', label: 'Nasional' },
    { key: 'daerah', label: 'Daerah' },
    { key: 'infografis', label: 'Infografis' },
  ];

  readonly newsItems = [
    { id: 1, title: 'BPJS Kesehatan Luncurkan Fitur Baru Mobile JKN', category: 'Nasional', imageUrl: 'assets/images/jamkes-peserta.png', date: '15 Juni 2026', route: '/berita/1' },
    { id: 2, title: 'Pentingnya Menjaga Status Kepesertaan JKN Tetap Aktif', category: 'Edukasi', imageUrl: 'assets/images/jamkes-manfaat.png', date: '12 Juni 2026', route: '/berita/2' },
    { id: 3, title: 'Kemudahan Akses Layanan di Fasilitas Kesehatan JKN', category: 'Nasional', imageUrl: 'assets/images/jamkes-layanan-alamat.png', date: '10 Juni 2026', route: '/berita/3' },
    { id: 4, title: 'Transformasi Digital BPJS Kesehatan untuk Peserta', category: 'Infografis', imageUrl: 'assets/images/jamkes-iuran.png', date: '8 Juni 2026', route: '/berita/4' },
  ];

  readonly infoServices = [
    { id: 1, title: 'Pusat Bantuan', description: 'Hubungi Care Center 165 atau layanan helpdesk BPJS Kesehatan', icon: 'support_agent', route: '/bantuan' },
    { id: 2, title: 'Lokasi Kantor', description: 'Temukan kantor BPJS Kesehatan terdekat dari lokasi Anda', icon: 'location_on', route: '/layanan/alamat' },
    { id: 3, title: 'Informasi Publik', description: 'Akses informasi publik tentang BPJS Kesehatan secara transparan', icon: 'description', route: '/informasi-publik' },
  ];

  readonly pandawa = [
    { id: 1, number: '1', title: 'Transformasi Layanan Primer', description: 'Penguatan layanan kesehatan tingkat pertama untuk akses yang lebih mudah', color: '#00A14C' },
    { id: 2, number: '2', title: 'Transformasi Layanan Rujukan', description: 'Peningkatan kualitas layanan rumah sakit dan faskes rujukan', color: '#1D4580' },
    { id: 3, number: '3', title: 'Transformasi Sistem Ketahanan Kesehatan', description: 'Penguatan sistem kesehatan nasional yang tangguh dan adaptif', color: '#EC242A' },
    { id: 4, number: '4', title: 'Transformasi Pembiayaan Kesehatan', description: 'Efisiensi dan efektivitas pembiayaan program JKN', color: '#F0A92E' },
    { id: 5, number: '5', title: 'Transformasi SDM Kesehatan', description: 'Pengembangan kompetensi tenaga kesehatan di seluruh Indonesia', color: '#8B5CF6' },
  ];

  readonly gallery = [
    { id: 1, title: 'Peluncuran Program JKN', imageUrl: 'assets/images/jamkes-peserta.png', route: '/galeri/1' },
    { id: 2, title: 'Sosialisasi Kesehatan', imageUrl: 'assets/images/jamkes-manfaat.png', route: '/galeri/2' },
    { id: 3, title: 'Kegiatan Faskes', imageUrl: 'assets/images/jamkes-layanan-alamat.png', route: '/galeri/3' },
    { id: 4, title: 'Transformasi Digital', imageUrl: 'assets/images/jamkes-iuran.png', route: '/galeri/4' },
  ];

  readonly videos = [
    { id: 1, title: 'Cara Daftar BPJS Kesehatan Online', thumbnail: 'assets/images/jamkes-peserta.png', duration: '5:30', route: '/video/1' },
    { id: 2, title: 'Tips Menggunakan Aplikasi Mobile JKN', thumbnail: 'assets/images/jamkes-manfaat.png', duration: '4:15', route: '/video/2' },
    { id: 3, title: 'Manfaat Program JKN untuk Keluarga', thumbnail: 'assets/images/jamkes-iuran.png', duration: '6:45', route: '/video/3' },
  ];

  readonly testimonials = [
    { id: 1, name: 'Siti Rahmawati', role: 'Peserta JKN Kelas I', rating: 5, quote: 'Pelayanan BPJS Kesehatan sangat baik. Saya bisa berobat di berbagai faskes dengan mudah dan cepat.' },
    { id: 2, name: 'Ahmad Fauzi', role: 'Peserta JKN PBI', rating: 4, quote: 'Program JKN sangat membantu keluarga saya. Biaya berobat jadi lebih terjangkau dengan jaminan kesehatan.' },
    { id: 3, name: 'Dewi Sartika', role: 'Peserta JKN Kelas II', rating: 5, quote: 'Aplikasi Mobile JKN memudahkan saya cek tagihan dan cari faskes. Sangat praktis dan informatif.' },
  ];

  readonly faqs = [
    { q: 'Bagaimana cara mendaftar BPJS Kesehatan?', a: 'Anda dapat mendaftar melalui aplikasi Mobile JKN, website resmi, atau datang langsung ke kantor BPJS Kesehatan terdekat dengan membawa KTP dan KK.' },
    { q: 'Berapa besaran iuran BPJS Kesehatan?', a: 'Besaran iuran tergantung kelas rawat: Kelas I Rp150.000/bulan, Kelas II Rp100.000/bulan, Kelas III Rp42.000/bulan dengan subsidi pemerintah.' },
    { q: 'Bagaimana cara cek status kepesertaan?', a: 'Cek status melalui aplikasi Mobile JKN, website, SMS, atau menghubungi Care Center 165 dengan memasukkan NIK atau nomor peserta.' },
    { q: 'Apa saja fasilitas yang didapat peserta?', a: 'Peserta mendapatkan layanan kesehatan di FKTP, FKRTL, obat-obatan, alat kesehatan, dan tindakan medis sesuai indikasi medis dan ketentuan yang berlaku.' },
  ];

  toggleFaq(index: number) {
    this.openFaqIndex.update(i => i === index ? null : index);
  }

  toggleChika() {
    this.chikaOpen.update(v => !v);
  }
}
