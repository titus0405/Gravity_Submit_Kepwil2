import { Component, signal, effect, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

interface BannerSlide {
  imageUrl?: string;
  bgGradient?: string;
  title: string;
  subtitle?: string;
  description: string;
  cta?: { label: string; route: string };
}

@Component({
  selector: 'bpjs-banner-carousel',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="relative overflow-hidden bg-neutral-900">
      <div class="relative h-[300px] md:h-[400px] lg:h-[500px]">
        @for (slide of slides; track $index; let i = $index) {
          <div class="absolute inset-0 transition-all duration-700 ease-in-out"
               [class.opacity-100]="current() === i"
               [class.opacity-0]="current() !== i"
               [class.pointer-events-auto]="current() === i"
               [class.pointer-events-none]="current() !== i">
            @if (slide.imageUrl) {
              <img [src]="slide.imageUrl" alt="" class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            } @else {
              <div [class]="'w-full h-full ' + slide.bgGradient"></div>
            }
            <div class="absolute inset-0 flex items-center">
              <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div class="max-w-xl">
                  @if (slide.subtitle) {
                    <span class="inline-block px-3 py-1 rounded-full bg-white/15 text-white/90 text-xs font-medium backdrop-blur-sm mb-3">
                      {{ slide.subtitle }}
                    </span>
                  }
                  <h2 class="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    {{ slide.title }}
                  </h2>
                  <p class="mt-3 text-sm md:text-base lg:text-lg text-white/70 max-w-lg leading-relaxed">
                    {{ slide.description }}
                  </p>
                  @if (slide.cta) {
                    <a [routerLink]="slide.cta.route"
                       class="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-white text-primary-700 font-semibold hover:bg-accent-50 transition-colors shadow-lg shadow-black/10 text-sm md:text-base">
                      {{ slide.cta.label }}
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>
                  }
                </div>
              </div>
            </div>
          </div>
        }
      </div>

      <!-- Navigation Arrows -->
      <button (click)="prev()" class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 z-10">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button (click)="next()" class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-all duration-200 z-10">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      <!-- Dots -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        @for (slide of slides; track $index; let i = $index) {
          <button (click)="goTo(i)"
                  class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  [class.w-8]="current() === i"
                  [class.bg-white]="current() === i"
                  [class.bg-white/40]="current() !== i">
          </button>
        }
      </div>
    </section>
  `,
})
export class BannerCarouselComponent implements OnInit, OnDestroy {
  readonly current = signal(0);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly slides: BannerSlide[] = [
    {
      imageUrl: 'assets/images/banner-profil.png',
      subtitle: 'Program JKN',
      title: 'Jaminan Kesehatan Nasional',
      description: 'BPJS Kesehatan menyelenggarakan program Jaminan Kesehatan Nasional (JKN) untuk melindungi kesehatan Anda dan keluarga.',
      cta: { label: 'Daftar Sekarang', route: '/layanan/daftar' },
    },

    {
      imageUrl: 'assets/images/jamkes-manfaat.png',
      subtitle: 'Program JKN',
      title: 'Manfaat Program JKN',
      description: 'BPJS Kesehatan memberikan berbagai manfaat kesehatan mulai dari layanan primer hingga rujukan bagi seluruh peserta.',
      cta: { label: 'Lihat Manfaat', route: '/program/manfaat' },
    },
    {
      imageUrl: 'assets/images/jamkes-peserta.png',
      subtitle: 'Kepesertaan',
      title: 'Informasi Kepesertaan',
      description: 'Kelola data kepesertaan JKN Anda dengan mudah. Perbarui data, cek status, dan akses kartu digital peserta.',
      cta: { label: 'Info Peserta', route: '/layanan/peserta' },
    },
    {
      imageUrl: 'assets/images/jamkes-prosedur.png',
      subtitle: 'Panduan',
      title: 'Prosedur & Alur Pelayanan',
      description: 'Pelajari prosedur dan alur pelayanan BPJS Kesehatan untuk mendapatkan akses layanan yang optimal.',
      cta: { label: 'Lihat Prosedur', route: '/layanan/prosedur' },
    },
  ];

  constructor() {
    effect(() => {
      this.current();
      this.resetAutoPlay();
    });
  }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    this.clearAutoPlay();
  }

  private startAutoPlay() {
    this.intervalId = setInterval(() => this.next(), 5000);
  }

  private resetAutoPlay() {
    this.clearAutoPlay();
    this.startAutoPlay();
  }

  private clearAutoPlay() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  next() {
    this.current.update(i => (i + 1) % this.slides.length);
  }

  prev() {
    this.current.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  goTo(index: number) {
    this.current.set(index);
  }
}
