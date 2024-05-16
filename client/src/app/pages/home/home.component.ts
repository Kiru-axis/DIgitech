import { Component } from '@angular/core';

import { HeroComponent } from './components/hero/hero.component';
import { OffersComponent } from './components/offers/offers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { FeaturedComponent } from './components/featured/featured.component';
import { PopularComponent } from './components/popular/popular.component';
import { SpecialComponent } from './components/special/special.component';
import { UsedByComponent } from './components/used-by/used-by.component';
import { BlogCardComponent } from '../blogs/blogs/components/blog-card/blog-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    HeroComponent,
    OffersComponent,
    CategoriesComponent,
    FeaturedComponent,
    PopularComponent,
    SpecialComponent,
    UsedByComponent,
    BlogCardComponent,
  ],
})
export class HomeComponent {}
