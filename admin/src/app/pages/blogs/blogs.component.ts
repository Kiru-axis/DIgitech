import { DatePipe, JsonPipe, SlicePipe } from '@angular/common';
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
import { BlogsFormComponent } from './components/blogs-form/blogs-form.component';
import { IBlog } from '@app/models';
import { Icons } from '@app/shared';
import { blogActions, selectBlogs } from '@app/store/blogs';
import { MatButtonModule } from '@angular/material/button';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-blogs',
  standalone: true,
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  imports: [
    RouterLink,
    JsonPipe,
    MatTableModule,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    DatePipe,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    CdkCopyToClipboard,
  ],
})
export class BlogsComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  // Mat table config
  displayColumms: string[] = [
    'Id',
    'Image',
    'Title',
    'Desc',
    'Author',
    'UpdatedAt',
    'Actions',
  ];

  dataSource: any;

  blogs: IBlog[] = [];

  icons = Icons;

  ngOnInit(): void {
    this.getBlogs();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  private getBlogs() {
    this.store.dispatch(blogActions.getAllBlogs({}));
    this.store
      .select(selectBlogs)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.blogs = d;
          this.dataSource = new MatTableDataSource<IBlog>(this.blogs);
          this.dataSource.paginator = this.paginator();
          this.dataSource.sort = this.sort();
        }
      });
  }

  openDialog() {
    this.dialog.open(BlogsFormComponent, {
      width: '60%',
      height: '90%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Add',
      },
    });
  }

  openEditDialog(blog: IBlog) {
    this.dialog.open(BlogsFormComponent, {
      width: '60%',
      height: '90%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Edit',
        editBlog: blog,
      },
    });
  }

  openDeleteDialog(blog: IBlog) {
    this.dialog.open(BlogsFormComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteBlog: blog,
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
