import {
  Component,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subject, takeUntil } from 'rxjs';

import { IProduct, ProductQueryType, QueryAvailableType } from '@app/models';
import { productActions, selectProducts } from '@store/products';
import { ProductComponent } from './components/product/product.component';
import { SliderComponent } from '@app/shared';
import { ProductSwiperConfig } from './swiper.config';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  imports: [ProductComponent, SliderComponent, RouterLink],
})
export class ProductsComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private store: Store) {}

  slider = input.required<boolean>();

  cols = input<number>(0);

  fullWidthMode = input<boolean>(false);

  destroy$ = new Subject();

  products: IProduct[] = [];

  swiperConfig = ProductSwiperConfig;

  // backend query params
  cat = input<string>('');
  color = input<string>('');
  brand = input<string>('');
  tag = input<string>('');
  min = input<string>('');
  max = input<string>('');
  page = input<string>('');
  limit = input<string>('');
  available = input<QueryAvailableType>();
  bestSelling = input<string>();
  latest = input<string>('');

  // removing all the query params
  removeFilters = input<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    let initialized: boolean = true;

    for (let prop in changes) {
      if (changes[prop].previousValue === undefined) {
        initialized = false;
        break;
      }
    }

    if (initialized) {
      console.log(changes);

      const removeFilters = changes.removeFilters?.currentValue;
      if (removeFilters) {
        this._getProducts({});
      }

      // filter by cat
      const cat = changes.cat?.currentValue;
      if (cat) {
        this._getProducts({ cat });
      }
      // filter by color
      const color = changes.color?.currentValue;
      if (color) this._getProducts({ color });
      // filter by brand
      const brand = changes.brand?.currentValue;
      if (brand) this._getProducts({ brand });
      // filter by tag
      const tag = changes.tag?.currentValue;
      if (tag) this._getProducts({ tag });
      // filter by min
      const min = changes.min?.currentValue;
      if (min) this._getProducts({ min });
      // filter by max
      const max = changes.max?.currentValue;
      if (max) this._getProducts({ max });

      // filter by bestSelling
      const bestSelling = changes.bestSelling?.currentValue;
      if (bestSelling) this._getProducts({ bestSelling });
      // filter by latest
      const latest = changes.latest?.currentValue;
      if (latest) this._getProducts({ latest });
    }
  }

  ngOnInit(): void {
    this._getProducts();
  }

  _getProducts(query?: ProductQueryType) {
    this.store.dispatch(
      productActions.getAllProducts({
        request: {
          ...query,
        },
      })
    );
    this.store
      .select(selectProducts)
      .pipe(
        takeUntil(this.destroy$),
        map((x) =>
          x.filter((c) =>
            c.Tags.filter((d) =>
              d.name.toLowerCase().includes(this.tag().toLowerCase())
            )
          )
        ),
        map((x) =>
          x.filter((n) =>
            n.Colors.filter((c) =>
              c.name.toLowerCase().includes(this.color().toLowerCase())
            )
          )
        ),
        map((x) =>
          x.filter((n) =>
            n.Brand.name.toLowerCase().includes(this.brand().toLowerCase())
          )
        )
      )
      .subscribe((res) => {
        if (res) {
          if (this.tag() && this.tag() !== '') {
            this.products = res.filter((x) =>
              x.Tags.some((n) => n.name.includes(this.tag()))
            );
          } else if (this.cat() && this.cat() !== '') {
            this.products = res.filter((y) => y.Category.name === this.cat());
          } else {
            this.products = res;
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
