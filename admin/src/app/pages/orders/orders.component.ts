import { CurrencyPipe, DatePipe, JsonPipe, SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { IOrderResponse } from '@app/models';
import { customerActions, selectOrders } from '@app/store/customer';
import { Icons } from '@app/shared';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
  imports: [
    RouterLink,
    JsonPipe,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    RouterLink,
    DatePipe,
    CurrencyPipe,
  ],
})
export class OrdersComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  // Mat table config
  displayColumms: string[] = ['Id', 'UserId', 'Total Price', 'Updated At'];

  dataSource: any;

  // end mat table config

  orders: IOrderResponse[] = [];

  icons = Icons;

  ngOnInit(): void {
    this.getOrders();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  private getOrders() {
    this.store.dispatch(customerActions.getOrders({}));
    this.store
      .select(selectOrders)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.orders = d;
          this.dataSource = new MatTableDataSource<IOrderResponse>(this.orders);
          this.dataSource.paginator = this.paginator();
          this.dataSource.sort = this.sort();
        }
      });
  }

  openEditDialog(order: IOrderResponse) {}

  openDeleteDialog(order: IOrderResponse) {}

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
