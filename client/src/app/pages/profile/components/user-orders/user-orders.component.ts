import { CurrencyPipe, DatePipe, SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IOrder } from '@app/models';
import { customerActions, selectOrders } from '@app/store/customer';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  standalone: true,
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss',
  imports: [DatePipe, SlicePipe, CurrencyPipe, RouterLink],
})
export class UserOrdersComponent implements OnInit, OnDestroy {
  constructor(private store: Store) {}

  destroy$ = new Subject();

  orders: IOrder[] | null | undefined;

  ngOnInit(): void {
    this.store.dispatch(customerActions.getOrders());
    this.store
      .select(selectOrders)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.orders = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
