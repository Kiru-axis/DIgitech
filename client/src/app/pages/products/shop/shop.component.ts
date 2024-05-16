import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe, SlicePipe } from '@angular/common';
import { Store } from '@ngrx/store';

import { RatingComponent, ColorComponent } from '@shared/index';

import {
  productActions,
  selectColors,
  selectProductCategory,
  selectTags,
} from '@app/store/products';
import { ProductsComponent } from '../products/products.component';
import { combineLatest } from 'rxjs';
import { QueryAvailableType } from '@app/models';

@Component({
  selector: 'app-shop',
  standalone: true,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
  imports: [
    ProductsComponent,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
    SlicePipe,
    RatingComponent,
    ColorComponent,
    FormsModule,
  ],
})
export class ShopComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  data$ = combineLatest({
    categories: this.store.select(selectProductCategory),
    colors: this.store.select(selectColors),
    tags: this.store.select(selectTags),
  });

  ngOnInit(): void {
    this.store.dispatch(productActions.getProductCategories());
    this.store.dispatch(productActions.getTags());
    this.store.dispatch(productActions.getColors());
  }

  // ##### FILTERATION  LOGIC

  // backend query params
  cat = '';
  color = '';
  brand = '';
  tag = '';
  min = '';
  max = '';
  available!: QueryAvailableType;
  bestSelling = '';
  latest = '';

  // removing all the query params
  removeFilters!: boolean;

  // filter products with category
  onSelectCategory(val: string) {
    this.cat = val;
  }

  // filter products with max price
  onSelectMaxPrice(e: Event) {
    this.max = (e.target as HTMLInputElement).value;
  }

  // filter products with min price
  onSelectMinPrice(e: Event) {
    this.min = (e.target as HTMLInputElement).value;
  }

  // filter products with color
  onSelectColor(val: string) {
    this.color = val;
  }

  // filter products with tag
  onSelectTag(val: string) {
    this.tag = val;
  }

  // filter products with availability
  onSelectAvailable(val: QueryAvailableType) {
    this.available = val;
  }

  onRemoveFilters() {
    this.removeFilters = true;
  }

  // ##### DISPLAY INTERFACE  LOGIC
  cols!: number;

  fullWidthMode!: boolean;

  onSelectBestLatest(e: Event) {
    const sel = (e.target as HTMLSelectElement).value;

    if (sel === 'latest') {
      this.latest = sel;
      this.bestSelling = '';
    }
    if (sel === 'bestSelling') {
      this.bestSelling = sel;
      this.latest = '';
    }
  }

  onChangeCols(colNum: number) {
    this.cols = colNum;

    if (colNum < 12) {
      this.fullWidthMode = false;
    }

    if (colNum === 12) {
      this.fullWidthMode = true;
    }
  }

  //

  @HostListener('window:resize', ['$event']) onResize() {
    const w = window.innerWidth;

    if (w <= 510) {
      this.cols = 0;
      this.fullWidthMode = true;
    }

    if (w <= 698) {
      this.cols = 0;
      this.fullWidthMode = true;
    }

    if (w <= 800) {
      this.cols = 0;
      this.fullWidthMode = false;
    }

    if (w >= 1000) {
      this.cols = 0;
      this.fullWidthMode = false;
    }
  }

  ngOnDestroy(): void {}
}
