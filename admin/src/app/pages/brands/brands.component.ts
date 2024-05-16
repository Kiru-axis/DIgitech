import { SlicePipe } from '@angular/common';
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
import { IProductBrand } from '@app/models';
import { productActions, selectBrands } from '@app/store/products';
import { BrandFormsComponent } from './components/brand-forms/brand-forms.component';
import { Icons } from '@app/shared';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-brands',
  standalone: true,
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
  imports: [
    ClipboardModule,
    RouterLink,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    RouterLink,
    MatButtonModule,
  ],
})
export class BrandsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  icons = Icons;

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  brands: IProductBrand[] = [];

  // Mat table config
  displayColumms: string[] = ['Id', 'Name', 'Actions'];

  dataSource: any;

  ngOnInit(): void {
    this.getProductBrands();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  openDialog() {
    this.dialog.open(BrandFormsComponent, {
      width: '50%',
      height: '50%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openDeleteDialog(brand: IProductBrand) {
    this.dialog.open(BrandFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteProductBrand: brand,
      },
    });
  }

  private getProductBrands() {
    this.store.dispatch(productActions.getProductCategories());
    this.store
      .select(selectBrands)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.brands = d;
          this.dataSource = new MatTableDataSource<IProductBrand>(this.brands);
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
