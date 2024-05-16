import { JsonPipe, SlicePipe } from '@angular/common';
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
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { IProduct } from '@app/models';
import { productActions, selectProducts } from '@app/store/products';
import { Icons, ColorComponent } from '@app/shared';
import { ProductFormsComponent } from './components/product-forms/product-forms.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    JsonPipe,
    MatTableModule,
    ColorComponent,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    RouterLink,
    ClipboardModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  // Mat table config
  displayColumms: string[] = [
    'Id',
    'Image',
    'Title',
    'Color',
    'Brand',
    'Available',
    'Actions',
  ];

  dataSource: any;

  // end mat table config

  products: IProduct[] = [];

  icons = Icons;

  ngOnInit(): void {
    this.getProducts();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  private getProducts() {
    this.store.dispatch(productActions.getAllProducts({}));
    this.store
      .select(selectProducts)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.products = d;
          this.dataSource = new MatTableDataSource<IProduct>(this.products);
          this.dataSource.paginator = this.paginator();
          this.dataSource.sort = this.sort();
        }
      });
  }

  openDialog() {
    this.dialog.open(ProductFormsComponent, {
      width: '60%',
      height: '90%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openEditDialog(product: IProduct) {
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

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
