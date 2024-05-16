import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { productActions } from './store/products';
import { Subject, takeUntil } from 'rxjs';
import { selectAuthUser } from './store/auth';
import { blogActions } from './store/blogs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  destroy$ = new Subject();
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.store.dispatch(productActions.getTags());
          this.store.dispatch(productActions.getColors());
          this.store.dispatch(productActions.getProductCategories());
          this.store.dispatch(productActions.getBrands());
          this.store.dispatch(blogActions.getAllBlogCategories());
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
