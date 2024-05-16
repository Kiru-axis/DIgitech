import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '@app/models';
import { ColorComponent, RatingComponent, TimesincePipe } from '@app/shared';
import { productActions, selectProduct } from '@app/store/products';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductFormsComponent } from '../products/components/product-forms/product-forms.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [
    MatGridListModule,
    MatDialogModule,
    MatCardModule,
    RatingComponent,
    CurrencyPipe,
    ColorComponent,
    ProductFormsComponent,
    MatButtonModule,
    MatTabsModule,
    TimesincePipe,
  ],
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  destroy$ = new Subject();

  product!: IProduct;

  ngOnInit() {
    this.getProduct();
  }

  getProduct() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          this.store.dispatch(
            productActions.getSingleProduct({
              productId: String(data.get('id')),
            })
          );
          return this.store.select(selectProduct);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.product = data;
        }
      });
  }

  openUpdateForm(product: IProduct) {
    this.dialog.open(ProductFormsComponent, {
      width: '60%',
      height: '90%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Edit',
        editProduct: product,
      },
    });
  }

  openDeleteDialog(product: IProduct) {
    this.dialog.open(ProductFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteProduct: product,
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
