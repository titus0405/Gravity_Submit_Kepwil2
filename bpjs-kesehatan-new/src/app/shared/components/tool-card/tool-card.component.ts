import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bpjs-tool-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="route()"
       class="flex items-start gap-4 p-5 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-primary-200 transition-all duration-300 group">
      <div class="shrink-0 flex items-center justify-center">
        <img [src]="icon()" [alt]="title()" class="w-[60px] h-[60px] shrink-0">
      </div>
      <div class="min-w-0">
        <h4 class="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">{{ title() }}</h4>
        <p class="mt-0.5 text-sm text-neutral-500 line-clamp-2">{{ description() }}</p>
      </div>
    </a>
  `,
})
export class ToolCardComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input.required<string>();
  readonly route = input.required<string>();
}
