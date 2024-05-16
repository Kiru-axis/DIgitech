import { AsyncPipe, CurrencyPipe, SlicePipe } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { SwiperDirective } from '@shared/directives/swiper.directive';
import { SpecialSwiperConfig } from './swiper.config';
import {
  ICreateCart,
  ICreateCompare,
  ICreateWishlist,
  IProduct,
  IUser,
} from '@app/models';
import { customerActions } from '@app/store/customer';
import { selectSpecialProducts } from '@app/store/products';
import { RatingComponent } from '@app/shared';
import { selectAuthUser } from '@app/store/auth';

@Component({
  selector: 'app-special',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    CurrencyPipe,
    SlicePipe,
    RatingComponent,
    SwiperDirective,
  ],
  templateUrl: './special.component.html',
  styleUrl: './special.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpecialComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private router: Router) {}

  addedToWishlist = false;

  config = SpecialSwiperConfig;

  products$!: Observable<IProduct[] | undefined | null>;

  user!: IUser;

  destroy$ = new Subject();

  ngOnInit(): void {
    this.getUser();
    this.products$ = this.store.select(selectSpecialProducts);
  }

  onAddToWishlist(dto: ICreateWishlist) {
    if (this.user) {
      this.store.dispatch(customerActions.addToWishlist({ request: dto }));
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onAddToCompare(dto: ICreateCompare) {
    if (this.user) {
      this.store.dispatch(customerActions.addToCompare({ request: dto }));
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  onAddToCart(productId: string, color: string) {
    if (this.user) {
      const request: ICreateCart = {
        productId,
        color,
        quantity: 1,
      };
      this.store.dispatch(customerActions.addToCart({ request }));
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  private getUser() {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) this.user = user;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
