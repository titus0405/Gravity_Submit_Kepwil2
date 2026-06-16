import { Component } from '@angular/core';

@Component({
  selector: 'bpjs-skeleton',
  standalone: true,
  template: `
    <div class="animate-pulse bg-neutral-200 rounded-lg h-full w-full">
      &nbsp;
    </div>
  `,
})
export class SkeletonComponent {}
