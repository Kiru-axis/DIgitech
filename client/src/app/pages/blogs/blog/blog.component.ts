import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';

import { IBlog } from '@app/models';
import { blogActions, selectBlog } from '@app/store/blogs';
import { Icons } from '@app/shared';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, DatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit, OnDestroy {
  icons = Icons;

  store = inject(Store);

  activatedRoute = inject(ActivatedRoute);

  destroy$ = new Subject();

  blog: IBlog | undefined | null;

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          this.store.dispatch(
            blogActions.getSingleBlog({
              blogId: String(data.get('id')),
            })
          );
          return this.store.select(selectBlog);
        })
      )
      .subscribe((d) => {
        this.blog = d;
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
