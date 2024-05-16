import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IBlogCategory } from '@app/models';
import { blogActions, selectBlogCategories } from '@app/store/blogs';
import { BlogCardComponent } from './components/blog-card/blog-card.component';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [AsyncPipe, BlogCardComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  store = inject(Store);

  router = inject(Router);

  blogCategories$!: Observable<IBlogCategory[] | null | undefined>;

  filterCategory = '';

  ngOnInit(): void {
    this.store.dispatch(blogActions.getAllBlogCategories());
    this.blogCategories$ = this.store.select(selectBlogCategories);
  }

  selectCategory(catName: string) {
    this.filterCategory = catName;
  }
}
