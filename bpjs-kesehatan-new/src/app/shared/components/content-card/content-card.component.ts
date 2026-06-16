import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'bpjs-content-card',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <a [routerLink]="route()"
       class="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      @if (imageUrl(); as img) {
        <div class="aspect-[4/3] overflow-hidden bg-neutral-100">
          <img [ngSrc]="img" [alt]="title()" width="616" height="275"
               class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
               loading="lazy">
        </div>
      }
      <div class="p-4" [class.pt-4]="!imageUrl()">
        @if (category()) {
          <span class="inline-block px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-xs font-medium mb-2">
            {{ category() }}
          </span>
        }
        <h3 class="font-display font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
          {{ title() }}
        </h3>
        @if (description()) {
          <p class="mt-1.5 text-sm text-neutral-600 line-clamp-2">{{ description() }}</p>
        }
      </div>
    </a>
  `,
})
export class ContentCardComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly imageUrl = input<string>();
  readonly route = input.required<string>();
  readonly category = input<string>();
}
