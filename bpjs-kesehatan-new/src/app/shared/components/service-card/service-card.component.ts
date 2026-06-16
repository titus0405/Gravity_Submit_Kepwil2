import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'bpjs-service-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a [routerLink]="route()"
       class="flex flex-col items-center gap-3 p-4 md:p-6 rounded-2xl bg-white hover:bg-primary-50 border-2 border-transparent hover:border-primary-100 transition-all duration-300 group cursor-pointer">
      <div class="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center">
        <img [src]="icon()" [alt]="name()" class="w-full h-full object-contain">
      </div>
      <span class="text-sm md:text-base font-medium text-neutral-800 group-hover:text-primary-700 text-center transition-colors">
        {{ name() }}
      </span>
    </a>
  `,
})
export class ServiceCardComponent {
  readonly name = input.required<string>();
  readonly icon = input.required<string>();
  readonly route = input.required<string>();
}
