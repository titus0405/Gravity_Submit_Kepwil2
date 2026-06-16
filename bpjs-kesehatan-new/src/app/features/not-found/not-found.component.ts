import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bpjs-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-[60vh] flex items-center justify-center">
      <div class="text-center px-4">
        <span class="material-icons-round text-8xl text-neutral-200">error_outline</span>
        <h1 class="font-display text-4xl md:text-5xl font-bold text-neutral-900 mt-4">404</h1>
        <p class="text-lg text-neutral-600 mt-2">Halaman yang Anda cari tidak ditemukan</p>
        <a routerLink="/" class="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors">
          <span class="material-icons-round">home</span>
          Kembali ke Beranda
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}
