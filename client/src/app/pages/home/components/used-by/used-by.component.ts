import { Component } from '@angular/core';

import { UsedBySwiperConfig } from './swiper.config';
import { SliderComponent } from '@app/shared';

@Component({
  selector: 'app-used-by',
  standalone: true,
  imports: [SliderComponent],
  template: `
    <div class="container shadow bg-white rounded ">
      <app-slider
        [itemTemplate]="customTemplate"
        [config]="config"
        [data]="brandImgs"
      ></app-slider>
      <ng-template #customTemplate let-item>
        <img [src]="item" class="used-by-brand" [alt]="item" />
      </ng-template>
    </div>
  `,
})
export class UsedByComponent {
  config = UsedBySwiperConfig;

  brandImgs = [
    'assets/images/brand-01.png',
    'assets/images/brand-02.png',
    'assets/images/brand-03.png',
    'assets/images/brand-04.png',
    'assets/images/brand-05.png',
    'assets/images/brand-06.png',
    'assets/images/brand-07.png',
    'assets/images/brand-08.png',
  ];
}
