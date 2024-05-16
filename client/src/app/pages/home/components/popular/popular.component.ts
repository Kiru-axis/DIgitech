import { Component } from '@angular/core';
import { ProductsComponent } from '@app/pages/products';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="popular container my-4">
      <h2 class="section-header">Popular Collection</h2>

      <app-products [tag]="'popular'" [slider]="true"> </app-products>
    </div>
  `,
})
export class PopularComponent {}
