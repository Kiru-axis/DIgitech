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
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { IColor } from '@app/models';
import { productActions, selectColors } from '@app/store/products';
import { ColorsFormsComponent } from './components/colors-forms/colors-forms.component';
import { Icons } from '@app/shared';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-colors',
  standalone: true,
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
  imports: [
    RouterLink,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    ClipboardModule,
  ],
})
export class ColorsComponent {
  constructor(private store: Store, private dialog: MatDialog) {}

  icons = Icons;

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  colors: IColor[] = [];

  // Mat table config
  displayColumms: string[] = ['Id', 'Name', 'Actions'];

  dataSource: any;

  ngOnInit(): void {
    this.getColors();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  openDialog() {
    this.dialog.open(ColorsFormsComponent, {
      width: '50%',
      height: '50%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openDeleteDialog(color: IColor) {
    this.dialog.open(ColorsFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteColor: color,
      },
    });
  }

  private getColors() {
    this.store.dispatch(productActions.getColors());
    this.store
      .select(selectColors)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.colors = d;
          this.dataSource = new MatTableDataSource<IColor>(this.colors);
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
