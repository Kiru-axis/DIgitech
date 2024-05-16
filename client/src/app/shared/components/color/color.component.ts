import { Component, input, output } from '@angular/core';
import { IColor } from '@app/models';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [],
  template: `
    <div class="d-flex align-items-center gap-1 flex-wrap my-colors">
      @if(colors()){
      <ng-container>
        @for (color of colors(); track $index) {
        <button
          [style]="{ backgroundColor: color.name, padding: size() + 'px' }"
          (click)="onSelectColor(color.name)"
          class="rounded-circle pointer"
        ></button>
        }
      </ng-container>
      }
    </div>
  `,
  styles: [
    `
      .my-colors {
        background-color: #f1f1f1;
        width: 100%;
        padding: 3px;
      }
    `,
  ],
})
export class ColorComponent {
  colors = input.required<IColor[] | undefined | null>();

  size = input<number>(10);

  onSelectColorChange = output<string>();

  onSelectColor(e: string) {
    this.onSelectColorChange.emit(e);
  }
}
