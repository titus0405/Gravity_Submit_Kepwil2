import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@features/home/home.component').then(m => m.HomeComponent),
    title: 'BPJS Kesehatan - Jaminan Kesehatan Nasional',
  },
  {
    path: 'tentang',
    loadComponent: () => import('@features/about/about.component').then(m => m.AboutComponent),
    title: 'Tentang BPJS Kesehatan',
  },
  {
    path: 'layanan',
    loadComponent: () => import('@features/services/services.component').then(m => m.ServicesComponent),
    title: 'Layanan BPJS Kesehatan',
  },
  {
    path: 'kontak',
    loadComponent: () => import('@features/contact/contact.component').then(m => m.ContactComponent),
    title: 'Hubungi BPJS Kesehatan',
  },
  {
    path: '**',
    loadComponent: () => import('@features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Halaman Tidak Ditemukan',
  },
];
