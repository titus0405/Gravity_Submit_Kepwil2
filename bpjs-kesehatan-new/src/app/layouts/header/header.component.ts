import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { NavigationService } from '@core/services';
import { SearchBarComponent } from '@shared/components';
import type { NavItem } from '@core/models';

@Component({
  selector: 'bpjs-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SearchBarComponent],
  animations: [
    trigger('megamenu', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(-8px)' }), animate('200ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(-8px)' }))]),
    ]),
    trigger('mobileMenu', [
      transition(':enter', [style({ opacity: 0, height: 0 }), animate('250ms ease-out', style({ opacity: 1, height: '*' }))]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0, height: 0 }))]),
    ]),
  ],
  template: `
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/60">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top bar -->
        <div class="flex items-center justify-between h-16 lg:h-[72px]">
          <a routerLink="/" class="flex items-center shrink-0">
            <img src="assets/images/logo-bpjs.svg" alt="BPJS Kesehatan" class="h-8 md:h-9 w-auto">
          </a>

          <!-- Desktop nav -->
          <nav class="hidden lg:flex items-center gap-1">
            @for (item of navItems(); track $index) {
              @if (item.children) {
                <div class="relative" (mouseenter)="openMega($index)" (mouseleave)="closeMega()">
                  <button class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                          [class.text-primary-600]="activeMegaIndex() === $index"
                          [class.text-neutral-700]="activeMegaIndex() !== $index"
                          [class.hover:text-primary-600]="true"
                          [class.hover:bg-primary-50]="true">
                    {{ item.label }}
                    <span class="material-icons-round text-base transition-transform duration-200"
                          [class.rotate-180]="activeMegaIndex() === $index">expand_more</span>
                  </button>
                  @if (activeMegaIndex() === $index) {
                    <div @megamenu
                         class="absolute top-full left-0 mt-2 w-[640px] xl:w-[720px] bg-white rounded-2xl shadow-xl border border-neutral-100 p-6">
                      <div class="grid grid-cols-3 gap-6">
                        @for (column of item.children; track $index) {
                          <div>
                            @if (column.title) {
                              <div class="flex items-center gap-2 mb-3">
                                @if (column.icon) {
                                  <span class="material-icons-round text-primary-500 text-lg">{{ column.icon }}</span>
                                }
                                <span class="text-xs font-semibold text-neutral-500 uppercase tracking-wider">{{ column.title }}</span>
                              </div>
                            }
                            <ul class="space-y-1">
                              @for (link of column.links; track $index) {
                                <li>
                                  <a [routerLink]="link.route"
                                     class="block px-3 py-2 rounded-lg text-sm text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                     [class.font-semibold]="link.isViewAll"
                                     [class.text-primary-600]="link.isViewAll">
                                    @if (link.isViewAll) {
                                      <span class="flex items-center gap-1">
                                        {{ link.label }}
                                        <span class="material-icons-round text-base">arrow_forward</span>
                                      </span>
                                    } @else {
                                      {{ link.label }}
                                    }
                                  </a>
                                </li>
                              }
                            </ul>
                          </div>
                        }
                      </div>
                    </div>
                  }
                </div>
              } @else {
                <a [routerLink]="item.route"
                   routerLinkActive="text-primary-600 bg-primary-50"
                   class="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-colors">
                  {{ item.label }}
                </a>
              }
            }
          </nav>

          <!-- Right actions -->
          <div class="flex items-center gap-2">
            <bpjs-search-bar (search)="onSearch($event)" />
            <a routerLink="/layanan/daftar"
               class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
              <span class="material-icons-round text-lg">person_add</span>
              Daftar
            </a>
            <a routerLink="/layanan/masuk"
               class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-neutral-200 text-neutral-700 text-sm font-medium hover:border-primary-300 hover:text-primary-600 transition-colors">
              <span class="material-icons-round text-lg">person</span>
              Masuk
            </a>
            <button (click)="toggleMobile()" class="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors" aria-label="Menu">
              <span class="material-icons-round text-neutral-700">{{ mobileOpen() ? 'close' : 'menu' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (mobileOpen()) {
        <div @mobileMenu class="lg:hidden border-t border-neutral-100 bg-white overflow-hidden">
          <div class="px-4 py-3 space-y-1 max-h-[70vh] overflow-y-auto">
            @for (item of navItems(); track $index) {
              @if (item.children) {
                <div>
                  <button (click)="toggleMobileSub($index)"
                          class="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                    {{ item.label }}
                    <span class="material-icons-round text-lg transition-transform"
                          [class.rotate-180]="openSubMenus().has($index)">expand_more</span>
                  </button>
                  @if (openSubMenus().has($index)) {
                    <div class="ml-3 mt-1 pb-2 space-y-1 border-l-2 border-primary-100 pl-3">
                      @for (column of item.children; track $index) {
                        @for (link of column.links; track $index) {
                          <a [routerLink]="link.route"
                             (click)="closeAll()"
                             class="block px-3 py-2 rounded-lg text-sm text-neutral-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                             [class.font-semibold]="link.isViewAll"
                             [class.text-primary-600]="link.isViewAll">
                            {{ link.label }}
                          </a>
                        }
                      }
                    </div>
                  }
                </div>
              } @else {
                <a [routerLink]="item.route"
                   (click)="closeAll()"
                   class="block px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors">
                  {{ item.label }}
                </a>
              }
            }
            <hr class="my-3 border-neutral-100">
            <a routerLink="/layanan/daftar" (click)="closeAll()"
               class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-primary-600 text-white text-sm font-medium hover:bg-primary-700 transition-colors">
              <span class="material-icons-round text-lg">person_add</span>
              Daftar
            </a>
            <a routerLink="/layanan/masuk" (click)="closeAll()"
               class="flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border-2 border-neutral-200 text-neutral-700 text-sm font-medium hover:border-primary-300 hover:text-primary-600 transition-colors mt-2">
              <span class="material-icons-round text-lg">person</span>
              Masuk
            </a>
          </div>
        </div>
      }
    </header>
  `,
})
export class HeaderComponent {
  private navService = inject(NavigationService);
  readonly navItems = this.navService.navItems;
  readonly activeMegaIndex = signal<number | null>(null);
  readonly mobileOpen = signal(false);
  readonly openSubMenus = signal<Set<number>>(new Set());

  openMega(index: number) {
    this.activeMegaIndex.set(index);
  }

  closeMega() {
    this.activeMegaIndex.set(null);
  }

  toggleMobile() {
    this.mobileOpen.update(v => !v);
  }

  toggleMobileSub(index: number) {
    this.openSubMenus.update(s => {
      const next = new Set(s);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  closeAll() {
    this.mobileOpen.set(false);
    this.openSubMenus.set(new Set());
  }

  onSearch(query: string) {
    console.log('Search:', query);
  }
}
