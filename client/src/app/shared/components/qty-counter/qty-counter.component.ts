import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-qty-counter',
  standalone: true,
  imports: [],
  templateUrl: './qty-counter.component.html',
  styleUrl: './qty-counter.component.scss',
})
export class QtyCounterComponent {
  value = model<number>(1);

  max = input.required<number>();

  decrease() {
    this.value.update((val) => (val >= 1 ? val - 1 : 0));
  }

  increase() {
    this.value.update((val) => (val < this.max() ? val + 1 : this.max()));
  }
}
