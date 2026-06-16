import { Injectable, signal } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import type { ContentCard, ProgrammeCard, EService, ToolCard, Article } from '../models';

@Injectable({ providedIn: 'root' })
export class ContentService {
  readonly medications = signal<ContentCard[]>([
    { id: '1', title: 'Omeprazole', description: 'Medication Information Leaflet', imageUrl: 'assets/images/logo-bpjs-white.svg', route: '/medications/omeprazole' },
    { id: '2', title: 'Metoclopramide', description: 'Metoclopramide is used to prevent and treat nausea or vomiting.', imageUrl: 'assets/images/jamkes-peserta.png', route: '/medications/metoclopramide' },
    { id: '3', title: 'NSAIDs (topical)', description: 'Topical NSAIDs are used to treat pain and reduce inflammation.', imageUrl: 'assets/images/jamkes-manfaat.png', route: '/medications/nsaids-topical' },
  ]);

  readonly conditions = signal<ContentCard[]>([
    { id: '1', title: 'Hipertensi', description: 'Tekanan darah tinggi', imageUrl: 'assets/images/jamkes-peserta.png', route: '/kondisi/hipertensi' },
    { id: '2', title: 'Diabetes', description: 'Kencing manis', imageUrl: 'assets/images/jamkes-manfaat.png', route: '/kondisi/diabetes' },
    { id: '3', title: 'Kolesterol Tinggi', description: 'Hyperlipidemia', imageUrl: 'assets/images/jamkes-iuran.png', route: '/kondisi/kolesterol-tinggi' },
    { id: '4', title: 'Jantung', description: 'Penyakit kardiovaskular', imageUrl: 'assets/images/jamkes-prosedur.png', route: '/kondisi/jantung' },
    { id: '5', title: 'Stroke', description: 'Serangan otak', imageUrl: 'assets/images/logo-bpjs.svg', route: '/kondisi/stroke' },
    { id: '6', title: 'Kanker', description: 'Penyakit neoplasma', imageUrl: 'assets/images/logo-care-center.png', route: '/kondisi/kanker' },
  ]);

  readonly programmes = signal<ProgrammeCard[]>([
    { id: '1', title: 'Program Pencegahan Penyakit Tidak Menular', description: 'Cegah PTM dengan gaya hidup sehat dan skrining rutin melalui program PROLANIS', imageUrl: 'assets/images/jamkes-donasi.png', route: '/program/ptm' },
    { id: '2', title: 'Program Kehamilan Sehat', description: 'Dapatkan layanan ANC, persalinan, dan nifas yang komprehensif', imageUrl: 'assets/images/jamkes-autodebit.png', route: '/program/kehamilan' },
    { id: '3', title: 'Lansia Sehat & Mandiri', description: 'Program khusus untuk peserta lanjut usia agar tetap sehat dan produktif', imageUrl: 'assets/images/jamkes-layanan-alamat.png', route: '/program/lansia' },
  ]);

  readonly eServices = signal<EService[]>([
    { id: '1', name: 'Cek Tagihan', icon: 'assets/icons/icon-financing.svg', route: '/layanan/tagihan', requiresAuth: true },
    { id: '2', name: 'Pendaftaran Peserta', icon: 'assets/icons/icon-appointments.png', route: '/layanan/daftar', requiresAuth: false },
    { id: '3', name: 'Cek Status Kepesertaan', icon: 'assets/icons/icon-healthier-sg.png', route: '/layanan/status', requiresAuth: true },
    { id: '4', name: 'Info Faskes', icon: 'assets/icons/icon-screening.svg', route: '/layanan/faskes', requiresAuth: false },
    { id: '5', name: 'Pembayaran Iuran', icon: 'assets/icons/icon-payments.png', route: '/layanan/pembayaran', requiresAuth: false },
    { id: '6', name: 'Pengajuan Klaim', icon: 'assets/icons/icon-lab-reports.png', route: '/layanan/klaim', requiresAuth: true },
  ]);

  readonly tools = signal<ToolCard[]>([
    { id: '1', title: 'Kalkulator BMI', description: 'Hitung indeks massa tubuh Anda', icon: 'assets/icons/icon-calculator.svg', route: '/alat/bmi' },
    { id: '2', title: 'Cek Kebutuhan Kalori', description: 'Ketahui kebutuhan kalori harian Anda', icon: 'assets/icons/icon-calculator.svg', route: '/alat/kalori' },
    { id: '3', title: 'Skrining Kesehatan', description: 'Cek skrining kesehatan yang direkomendasikan', icon: 'assets/icons/icon-screening.svg', route: '/alat/skrining' },
    { id: '4', title: 'Info Biaya & Subsid', description: 'Informasi skema pembiayaan kesehatan', icon: 'assets/icons/icon-financing.svg', route: '/alat/biaya' },
  ]);

  readonly articles = signal<Article[]>([
    { id: '1', title: '5 Tips Hidup Sehat untuk Cegah Penyakit Kronis', summary: 'Cegah penyakit kronis dengan olahraga teratur dan pola makan seimbang.', imageUrl: 'assets/images/jamkes-peserta.png', route: '/artikel/tips-hidup-sehat', publishedDate: new Date('2026-01-15'), category: 'Gaya Hidup' },
    { id: '2', title: 'Pentingnya Vaksinasi Sejak Dini', summary: 'Lindungi diri dan keluarga dengan vaksinasi lengkap sesuai jadwal.', imageUrl: 'assets/images/jamkes-manfaat.png', route: '/artikel/pentingnya-vaksinasi', publishedDate: new Date('2026-01-10'), category: 'Kesehatan' },
    { id: '3', title: 'Panduan Gizi Seimbang untuk Keluarga', summary: 'Kebutuhan gizi harian yang direkomendasikan untuk semua anggota keluarga.', imageUrl: 'assets/images/header-profil.png', route: '/artikel/gizi-seimbang', publishedDate: new Date('2026-01-05'), category: 'Nutrisi' },
  ]);

  getData$<T>(data: ReturnType<typeof signal<T>>) {
    return of(data()).pipe(delay(300));
  }
}
