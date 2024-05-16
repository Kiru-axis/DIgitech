import { Component, input, output } from '@angular/core';
import { IReview, IUser } from '@app/models';
import { RatingComponent } from '@app/shared';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [RatingComponent],
  templateUrl: './product-reviews.component.html',
  styleUrl: './product-reviews.component.scss',
})
export class ProductReviewsComponent {
  reviews = input.required<IReview[]>();
  user = input.required<IUser>();

  deleteReviewChange = output<string>();

  onDeleteReview(reviewId: string) {
    this.deleteReviewChange.emit(reviewId);
  }
}
