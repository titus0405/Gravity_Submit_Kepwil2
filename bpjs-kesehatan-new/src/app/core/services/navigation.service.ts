import { Injectable, signal } from '@angular/core';
import type { NavItem } from '../models';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  readonly navItems = signal<NavItem[]>([
    {
      label: 'Beranda',
      route: '/',
    },
    {
      label: 'Tentang BPJS',
      route: '/tentang',
    },
    {
      label: 'Program & Layanan',
      children: [
        {
          title: 'Program Kesehatan',
          icon: 'health_and_safety',
          links: [
            { label: 'PROLANIS', route: '/program/prolanis' },
            { label: 'Program Kehamilan', route: '/program/kehamilan' },
            { label: 'Program Lansia', route: '/program/lansia' },
            { label: 'Program Gigi', route: '/program/gigi' },
          ],
        },
        {
          title: 'Layanan Peserta',
          icon: 'support_agent',
          links: [
            { label: 'Pendaftaran', route: '/layanan/daftar' },
            { label: 'Perubahan Data', route: '/layanan/ubah-data' },
            { label: 'Informasi Tagihan', route: '/layanan/tagihan' },
            { label: 'Info Faskes', route: '/layanan/faskes' },
          ],
        },
        {
          title: 'Populer',
          icon: 'trending_up',
          links: [
            { label: 'Cara Daftar BPJS Kesehatan', route: '/artikel/cara-daftar' },
            { label: 'Besaran Iuran 2026', route: '/artikel/besaran-iuran' },
            { label: 'Faskes Tingkat 1', route: '/artikel/faskes-tingkat-1' },
          ],
        },
      ],
    },
    {
      label: 'Kesehatan',
      children: [
        {
          title: 'Kondisi Kesehatan',
          icon: 'health_and_safety',
          links: [
            { label: 'Hipertensi', route: '/kondisi/hipertensi' },
            { label: 'Diabetes', route: '/kondisi/diabetes' },
            { label: 'Kolesterol', route: '/kondisi/kolesterol' },
            { label: 'Jantung', route: '/kondisi/jantung' },
            { label: 'Stroke', route: '/kondisi/stroke' },
            { label: 'Lihat Semua', route: '/kondisi', isViewAll: true },
          ],
        },
        {
          title: 'Gaya Hidup Sehat',
          icon: 'favorite',
          links: [
            { label: 'Olahraga & Fitness', route: '/gaya-hidup/olahraga' },
            { label: 'Makanan & Gizi', route: '/gaya-hidup/gizi' },
            { label: 'Kesehatan Mental', route: '/gaya-hidup/mental' },
            { label: 'Perawatan Pribadi', route: '/gaya-hidup/perawatan' },
          ],
        },
        {
          title: 'Artikel',
          icon: 'article',
          links: [
            { label: 'Pentingnya Vaksinasi', route: '/artikel/pentingnya-vaksinasi' },
            { label: 'Cek Kesehatan Rutin', route: '/artikel/cek-kesehatan-rutin' },
            { label: 'Tips Hidup Sehat', route: '/artikel/tips-hidup-sehat' },
            { label: 'Lihat Semua', route: '/artikel', isViewAll: true },
          ],
        },
      ],
    },
    {
      label: 'Pusat Bantuan',
      route: '/bantuan',
    },
  ]);

  readonly mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
