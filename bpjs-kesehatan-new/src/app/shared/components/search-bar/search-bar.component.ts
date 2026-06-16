import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'bpjs-search-bar',
  standalone: true,
  imports: [FormsModule],
  animations: [
    trigger('expandSearch', [
      transition(':enter', [style({ width: 0, opacity: 0 }), animate('200ms ease-out', style({ width: '100%', opacity: 1 }))]),
      transition(':leave', [animate('200ms ease-in', style({ width: 0, opacity: 0 }))]),
    ]),
  ],
  template: `
    <div class="relative flex items-center">
      @if (!isExpanded()) {
        <button (click)="toggleSearch()"
                class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 transition-colors"
                aria-label="Cari">
          <span class="material-icons-round text-neutral-600">search</span>
        </button>
      }
      @if (isExpanded()) {
        <div class="flex items-center gap-2" @expandSearch>
          <div class="relative">
            <span class="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-lg pointer-events-none">search</span>
            <input #searchInput
                   [(ngModel)]="query"
                   (ngModelChange)="onSearch()"
                   (keydown.escape)="closeSearch()"
                   type="text"
                   placeholder="Cari..."
                   class="w-48 md:w-64 h-10 pl-10 pr-4 rounded-full bg-neutral-100 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all">
          </div>
          <button (click)="closeSearch()"
                  class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-neutral-100 transition-colors"
                  aria-label="Tutup pencarian">
            <span class="material-icons-round text-neutral-500 text-lg">close</span>
          </button>
        </div>
      }
    </div>
  `,
})
export class SearchBarComponent {
  readonly search = output<string>();
  readonly isExpanded = signal(false);
  readonly query = signal('');

  toggleSearch() {
    this.isExpanded.set(true);
  }

  closeSearch() {
    this.isExpanded.set(false);
    this.query.set('');
    this.search.emit('');
  }

  onSearch() {
    this.search.emit(this.query());
  }
}
