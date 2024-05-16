import { Directive, ElementRef, Input } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective {
  private readonly swiperElement: HTMLElement;

  @Input() config?: SwiperOptions;

  constructor(private el: ElementRef<HTMLElement>) {
    this.swiperElement = el.nativeElement;
  }

  ngAfterViewInit() {
    Object.assign(this.el.nativeElement, this.config);

    // @ts-ignore
    this.el.nativeElement.initialize();
  }
}
