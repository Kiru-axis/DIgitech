import { NgTemplateOutlet } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';
import { SwiperDirective } from '@app/shared/directives/swiper.directive';
import { SwiperOptions } from 'swiper/types';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [SwiperDirective, NgTemplateOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <swiper-container appSwiper [config]="config" init="false">
      @for (item of data; track $index) {
      <swiper-slide>
        <ng-container
          [ngTemplateOutlet]="itemTemplate"
          [ngTemplateOutletContext]="{ $implicit: item }"
        >
        </ng-container>

        <ng-template #sliderData></ng-template> </swiper-slide
      >}
    </swiper-container>
  `,
  styles: [
    `
      :host {
        max-width: 100%;
      }
    `,
  ],
})
export class SliderComponent {
  @Input({ required: true }) config!: SwiperOptions;

  @Input({ required: true }) data!: any[];

  @Input({}) itemTemplate!: TemplateRef<any>;
}
