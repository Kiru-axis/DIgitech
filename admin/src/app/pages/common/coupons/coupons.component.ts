import { DatePipe, SlicePipe } from '@angular/common';
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

import { ICoupon, ICreateCoupon } from '@app/models';
import { commonActions, selectCoupons } from '@app/store/common';
import { CouponFormsComponent } from './components/coupon-forms/coupon-forms.component';
import { Icons } from '@app/shared';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-coupons',
  standalone: true,
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
  imports: [
    RouterLink,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    RouterLink,
    DatePipe,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class CouponsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  icons = Icons;

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  coupons: ICoupon[] = [];

  // Mat table config
  displayColumms: string[] = [
    'Id',
    'Code',
    'Discount',
    'From',
    'To',
    'Actions',
  ];

  dataSource: any;

  ngOnInit(): void {
    this.getCoupons();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  openDialog() {
    this.dialog.open(CouponFormsComponent, {
      width: '60%',
      height: '60%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openDeleteDialog(coupon: ICreateCoupon) {
    this.dialog.open(CouponFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteCoupon: coupon,
      },
    });
  }

  private getCoupons() {
    this.store.dispatch(commonActions.getAllCoupons());
    this.store
      .select(selectCoupons)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.coupons = data;
          this.dataSource = new MatTableDataSource<ICoupon>(this.coupons);
          this.dataSource.paginator = this.paginator();
          this.dataSource.sort = this.sort();
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
