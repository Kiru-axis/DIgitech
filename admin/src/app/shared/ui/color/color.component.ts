import { Component, input, output } from '@angular/core';
import { IColor } from '@app/models';

@Component({
  selector: 'app-color',
  standalone: true,
  imports: [],
  template: `
    <div class="app-color">
      @if(colors()){
      <ng-container>
        @for (color of colors(); track $index) {
        <button
          [style]="{ backgroundColor: color.name, padding: size() + 'px' }"
          (click)="onSelectColor(color.name)"
          class="color"
        ></button>
        }
      </ng-container>
      }
    </div>
  `,
  styles: [
    `
      .app-color {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex-wrap: wrap;
        background-color: rgba(255, 255, 255, 0.4);
        width: 100%;
        padding: 3px;
      }

      .color {
        border-radius: 50%;
        cursor: pointer;
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
