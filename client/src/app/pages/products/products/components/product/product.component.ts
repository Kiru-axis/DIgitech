import { Component, OnDestroy, OnInit, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, CurrencyPipe, NgClass, SlicePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { selectAuthUser } from '@app/store/auth';
import { customerActions } from '@app/store/customer';
import { RatingComponent } from '@app/shared';

import {
  ICreateCart,
  ICreateCompare,
  ICreateWishlist,
  IProduct,
  IUser,
} from '@app/models';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    AsyncPipe,
    CurrencyPipe,
    SlicePipe,
    RouterLink,
    RatingComponent,
    NgClass,
  ],
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private router: Router) {}

  product = input.required<IProduct>();

  cols = input<number>();

  fullWidthMode = input<boolean>(false);

  destroy$ = new Subject();

  user!: IUser;

  addedToWishlist = false;

  addedToCompare = false;
  ngOnInit(): void {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });
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

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
