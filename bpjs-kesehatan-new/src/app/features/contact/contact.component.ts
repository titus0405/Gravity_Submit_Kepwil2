import { Component } from '@angular/core';

@Component({
  selector: 'bpjs-contact',
  standalone: true,
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mb-4">
            Hubungi Kami
          </div>
          <h1 class="font-display text-3xl md:text-4xl font-bold text-neutral-900">
            Ada Pertanyaan?
          </h1>
          <p class="mt-3 text-neutral-600">Kami siap membantu Anda melalui berbagai saluran komunikasi</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <div class="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
              <span class="material-icons-round text-primary-600">phone</span>
            </div>
            <h3 class="font-semibold text-neutral-900">Care Center 165</h3>
            <p class="text-sm text-neutral-600 mt-1">Senin - Jumat, 08:00 - 17:00</p>
            <a href="tel:165" class="text-lg font-bold text-primary-600 hover:text-primary-700 mt-2 block">165</a>
          </div>

          <div class="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mb-4">
              <span class="material-icons-round text-accent-600">chat</span>
            </div>
            <h3 class="font-semibold text-neutral-900">WhatsApp</h3>
            <p class="text-sm text-neutral-600 mt-1">Chat dengan petugas BPJS Kesehatan</p>
            <a href="https://wa.me/62811265165" target="_blank" class="text-lg font-bold text-accent-600 hover:text-accent-700 mt-2 block">+62-811-2651-65</a>
          </div>

          <div class="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
              <span class="material-icons-round text-secondary-600">email</span>
            </div>
            <h3 class="font-semibold text-neutral-900">Email</h3>
            <p class="text-sm text-neutral-600 mt-1">Kirimkan pertanyaan melalui email</p>
            <a href="mailto:halo@bpjs-kesehatan.go.id" class="text-sm font-medium text-secondary-600 hover:text-secondary-700 mt-2 block">halo&#64;bpjs-kesehatan.go.id</a>
          </div>

          <div class="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 transition-colors">
            <div class="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center mb-4">
              <span class="material-icons-round text-pink-600">location_on</span>
            </div>
            <h3 class="font-semibold text-neutral-900">Kantor Pusat</h3>
            <p class="text-sm text-neutral-600 mt-1">Jl. Letjen Suprapto Kav. 5, Cempaka Putih</p>
            <p class="text-sm text-neutral-600">Jakarta Pusat 10510</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-8 border border-neutral-200">
          <h2 class="font-display text-xl font-bold text-neutral-900 mb-6">Kirim Pesan</h2>
          <form class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1.5">Nama Lengkap</label>
                <input type="text" class="w-full h-11 px-4 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" placeholder="Nama Anda">
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-1.5">Email</label>
                <input type="email" class="w-full h-11 px-4 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" placeholder="email@anda.com">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1.5">Subjek</label>
              <input type="text" class="w-full h-11 px-4 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all" placeholder="Subjek pesan">
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-1.5">Pesan</label>
              <textarea rows="4" class="w-full px-4 py-3 rounded-xl border border-neutral-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all resize-none" placeholder="Tulis pesan Anda..."></textarea>
            </div>
            <button type="submit" class="h-11 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium transition-colors">
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class ContactComponent {}
