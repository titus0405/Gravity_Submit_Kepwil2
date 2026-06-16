import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '@core/services';
import { ServiceCardComponent } from '@shared/components';

@Component({
  selector: 'bpjs-services',
  standalone: true,
  imports: [RouterLink, ServiceCardComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mb-4">
          Layanan Digital
        </div>
        <h1 class="font-display text-3xl md:text-4xl font-bold text-neutral-900">
          Layanan BPJS Kesehatan
        </h1>
        <p class="mt-3 text-neutral-600 max-w-2xl mx-auto">
          Akses berbagai layanan BPJS Kesehatan secara online dengan mudah dan cepat
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        @for (service of content.eServices(); track service.id) {
          <bpjs-service-card [name]="service.name" [icon]="service.icon" [route]="service.route" />
        }
      </div>

      <div class="mt-16">
        <h2 class="font-display text-2xl font-bold text-neutral-900 mb-6">Panduan Layanan</h2>
        <div class="grid md:grid-cols-3 gap-6">
          @for (guide of guides; track guide.title) {
            <div class="bg-white rounded-xl p-6 border border-neutral-200 hover:border-primary-200 transition-colors">
              <span class="material-icons-round text-3xl text-primary-600">{{ guide.icon }}</span>
              <h3 class="font-semibold text-neutral-900 mt-3 mb-2">{{ guide.title }}</h3>
              <p class="text-sm text-neutral-600">{{ guide.description }}</p>
              <a [routerLink]="guide.route" class="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 hover:text-primary-700">
                Pelajari <span class="material-icons-round text-base">arrow_forward</span>
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class ServicesComponent {
  readonly content = inject(ContentService);

  readonly guides = [
    { title: 'Cara Mendaftar', icon: 'person_add', description: 'Panduan lengkap pendaftaran peserta BPJS Kesehatan secara online dan offline.', route: '/artikel/cara-daftar' },
    { title: 'Pembayaran Iuran', icon: 'payments', description: 'Informasi metode pembayaran iuran BPJS Kesehatan yang tersedia.', route: '/layanan/pembayaran' },
    { title: 'Pengajuan Klaim', icon: 'description', description: 'Prosedur dan persyaratan pengajuan klaim BPJS Kesehatan.', route: '/layanan/klaim' },
  ];
}
