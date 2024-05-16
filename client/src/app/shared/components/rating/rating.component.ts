import { Component, input } from '@angular/core';
import { Icons } from '@app/shared/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  icons = Icons;

  stars = input.required<number>();

  size = input<SizeProp>();

  starArray() {
    return this.stars()
      ? Array(this.stars()).fill(this.stars())
      : Array(1).fill(1);
  }

  showStarRate(num: number) {
    console.log(num);
  }
}
