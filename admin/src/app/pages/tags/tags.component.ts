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
import { ITag } from '@app/models';
import { productActions, selectTags } from '@app/store/products';
import { TagFormsComponent } from './components/tag-forms/tag-forms.component';
import { Icons } from '@app/shared';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
  imports: [
    RouterLink,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class TagsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  icons = Icons;

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  tags: ITag[] = [];

  // Mat table config
  displayColumms: string[] = ['Id', 'Name', 'Actions'];

  dataSource: any;

  ngOnInit(): void {
    this.getTags();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  openDialog() {
    this.dialog.open(TagFormsComponent, {
      width: '50%',
      height: '50%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openDeleteDialog(tag: ITag) {
    this.dialog.open(TagFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteTag: tag,
      },
    });
  }

  private getTags() {
    this.store.dispatch(productActions.getProductCategories());
    this.store
      .select(selectTags)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.tags = d;
          this.dataSource = new MatTableDataSource<ITag>(this.tags);
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
