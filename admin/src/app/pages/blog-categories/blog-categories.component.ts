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
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { IBlogCategory } from '@app/models';
import { blogActions, selectBlogCategories } from '@app/store/blogs';
import { BlogCategoryFormsComponent } from './components/blog-category-forms/blog-category-forms.component';
import { Icons } from '@app/shared';

@Component({
  selector: 'app-blog-categories',
  standalone: true,
  templateUrl: './blog-categories.component.html',
  styleUrl: './blog-categories.component.scss',
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
export class BlogCategoriesComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  icons = Icons;

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  categories: IBlogCategory[] = [];

  // Mat table config
  displayColumms: string[] = ['Id', 'Name', 'Actions'];

  dataSource: any;

  ngOnInit(): void {
    this.getCategories();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  openDialog() {
    this.dialog.open(BlogCategoryFormsComponent, {
      width: '50%',
      height: '50%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openDeleteDialog(category: IBlogCategory) {
    this.dialog.open(BlogCategoryFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteBlogCategory: category,
      },
    });
  }

  private getCategories() {
    this.store.dispatch(blogActions.getAllBlogCategories());
    this.store
      .select(selectBlogCategories)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.categories = d;
          this.dataSource = new MatTableDataSource<IBlogCategory>(
            this.categories
          );
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
