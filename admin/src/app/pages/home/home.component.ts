import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { customerActions, selectOrders } from '@app/store/customer';
import { productActions, selectProducts } from '@app/store/products';
import { selectDbUsers, userActions } from '@app/store/user';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  destroy$ = new Subject();

  products = {
    total: 0,
    unavailable: 0,
  };

  orders = {
    ordersPlaced: 0,
    revenue: 0,
  };

  users = {
    total: 0,
    blocked: 0,
  };

  ngOnInit(): void {
    this.store.dispatch(userActions.getAllUsers({}));
    this.store
      .select(selectDbUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.users = {
            blocked: res.filter((u) => u.blocked).length,
            total: res.length,
          };
        }
      });

    this.store.dispatch(productActions.getAllProducts({}));
    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.products = {
            unavailable: res.filter((u) => !u.available).length,
            total: res.length,
          };
        }
      });

    this.store.dispatch(customerActions.getOrders({}));
    this.store
      .select(selectOrders)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.orders = {
            ordersPlaced: res.length,
            revenue: res
              .map((c) => c.totalPriceAfterDiscount)
              .reduce((a, b) => a + b, 0),
          };
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
