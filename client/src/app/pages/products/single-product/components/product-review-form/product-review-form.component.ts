import { NgClass } from '@angular/common';
import { Component, output, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { RatingComponent } from '@app/shared';

@Component({
  selector: 'app-product-review-form',
  standalone: true,
  imports: [FormsModule, RatingComponent, NgClass],
  templateUrl: './product-review-form.component.html',
  styleUrl: './product-review-form.component.scss',
})
export class ProductReviewFormComponent {
  form = viewChild<NgForm>('form');

  formValues = {
    star: 1,
    comment: '',
  };

  submitRatingChange = output<any>();

  submit() {
    if (this.form()?.valid) {
      this.submitRatingChange.emit(this.form()?.value);
    }
  }
}
