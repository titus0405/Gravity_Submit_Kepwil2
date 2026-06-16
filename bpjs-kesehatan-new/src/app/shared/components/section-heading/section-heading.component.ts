import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bpjs-section-heading',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex items-center justify-between mb-6 md:mb-8">
      <div>
        <h2 class="font-display text-2xl md:text-3xl font-bold text-neutral-900">
          {{ title() }}
        </h2>
        @if (subtitle()) {
          <p class="mt-1 text-neutral-600 text-sm md:text-base">{{ subtitle() }}</p>
        }
      </div>
      @if (viewAllLink()) {
        <a [routerLink]="viewAllLink()"
           class="hidden md:inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
          Lihat Semua
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.376 4.034c.297.198.297.634 0 .832L.777 7.932c-.332.222-.777-.016-.777-.416V1.384c0-.399.445-.637.777-.416l4.599 3.066z" fill="currentColor"/>
          </svg>
        </a>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly viewAllLink = input<string>();
}
