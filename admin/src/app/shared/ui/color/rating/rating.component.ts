import { Component, input } from '@angular/core';
import { Icons } from '@app/shared/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

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
    return Array(this.stars()).fill(this.stars());
  }

  showStarRate(num: number) {
    console.log(num);
  }
}
