import { Component } from '@angular/core';
import { ProductsComponent } from '@app/pages/products';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [ProductsComponent],
  template: `
    <div class="featured container my-4">
      <h2 class="section-header">Featured Collection</h2>
      <app-products [tag]="'featured'" [slider]="true"></app-products>
    </div>
  `,
})
export class FeaturedComponent {}
