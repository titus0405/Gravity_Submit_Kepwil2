import { Component } from '@angular/core';

@Component({
  selector: 'bpjs-about',
  standalone: true,
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mb-4">
            Tentang Kami
          </div>
          <h1 class="font-display text-3xl md:text-4xl font-bold text-neutral-900">
            BPJS Kesehatan
          </h1>
          <p class="mt-3 text-neutral-600 text-lg leading-relaxed">
            Badan Penyelenggara Jaminan Sosial Kesehatan adalah badan hukum publik yang bertugas menyelenggarakan program Jaminan Kesehatan Nasional (JKN) bagi seluruh rakyat Indonesia.
          </p>
        </div>

        <div class="space-y-8">
          <div class="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h2 class="font-display text-xl font-bold text-neutral-900 mb-4">Sejarah BPJS Kesehatan</h2>
            <p class="text-neutral-600 leading-relaxed mb-3">
              BPJS Kesehatan mulai beroperasi pada 1 Januari 2014 berdasarkan Undang-Undang Nomor 24 Tahun 2011 tentang Badan Penyelenggara Jaminan Sosial.
            </p>
            <p class="text-neutral-600 leading-relaxed">
              Program JKN bertujuan memberikan perlindungan kesehatan kepada seluruh penduduk Indonesia melalui sistem jaminan sosial nasional yang bersifat wajib.
            </p>
          </div>

          <div class="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200">
            <h2 class="font-display text-xl font-bold text-neutral-900 mb-4">Visi & Misi</h2>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <span class="material-icons-round text-primary-600 mt-0.5">visibility</span>
                <div>
                  <h3 class="font-semibold text-neutral-900">Visi</h3>
                  <p class="text-sm text-neutral-600">Menjadi program jaminan sosial terpercaya, unggul, dan berkelanjutan untuk seluruh rakyat Indonesia.</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <span class="material-icons-round text-primary-600 mt-0.5">flag</span>
                <div>
                  <h3 class="font-semibold text-neutral-900">Misi</h3>
                  <p class="text-sm text-neutral-600">Menyelenggarakan jaminan kesehatan yang berkualitas, adil, dan merata dengan tata kelola yang baik.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-primary-50 rounded-xl p-5 text-center">
              <span class="material-icons-round text-3xl text-primary-600">account_balance</span>
              <h3 class="font-semibold text-neutral-900 mt-2">Badan Hukum Publik</h3>
              <p class="text-xs text-neutral-600 mt-1">Berlandaskan UU RI</p>
            </div>
            <div class="bg-accent-50 rounded-xl p-5 text-center">
              <span class="material-icons-round text-3xl text-accent-600">people</span>
              <h3 class="font-semibold text-neutral-900 mt-2">Seluruh Rakyat</h3>
              <p class="text-xs text-neutral-600 mt-1">Perlindungan universal</p>
            </div>
            <div class="bg-secondary-50 rounded-xl p-5 text-center">
              <span class="material-icons-round text-3xl text-secondary-600">verified</span>
              <h3 class="font-semibold text-neutral-900 mt-2">Terpercaya</h3>
              <p class="text-xs text-neutral-600 mt-1">Tata kelola yang baik</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {}
