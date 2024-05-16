import { AsyncPipe, SlicePipe } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  SimpleChanges,
  input,
  OnChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { TimesincePipe } from '@shared/pipes/timesince.pipe';
import { BlogSwiperConfig } from './swiper.config';
import { IBlog } from '@app/models';
import { blogActions, selectBlogs } from '@app/store/blogs';
import { SliderComponent } from '@app/shared';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
  imports: [RouterLink, TimesincePipe, SlicePipe, AsyncPipe, SliderComponent],
})
export class BlogCardComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private store: Store) {}

  config = BlogSwiperConfig;

  destroy$ = new Subject();

  slider = input.required<boolean>();

  category = input<string>('');

  blogs!: IBlog[];

  colums = input<{ md: number; lg: number; sm: number }>({
    lg: 3,
    md: 4,
    sm: 6,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.category) {
      const cat = changes?.category.currentValue;
      this.store.dispatch(blogActions.getAllBlogs({ request: { cat } }));
      // this.router.navigate(['/blogs'], { queryParams: { cat } });
    }
  }

  ngOnInit(): void {
    this.store.dispatch(blogActions.getAllBlogs({}));

    this.store
      .select(selectBlogs)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.blogs = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
