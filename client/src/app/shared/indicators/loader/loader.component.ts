import { AsyncPipe } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, delay, takeUntil, tap } from 'rxjs';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (loading$ | async) {
    <div class="loading">
      <div class="loader"></div>
    </div>
    }
  `,
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading$!: Observable<boolean>;

  destroy$ = new Subject<any>();

  @Input()
  detectRouteTransitions = false;

  constructor(private loaderService: LoaderService, private router: Router) {
    this.loading$ = this.loaderService.loading$;
  }

  ngOnInit(): void {
    if (this.detectRouteTransitions) {
      this.router.events
        .pipe(
          tap((event) => {
            if (event instanceof RouteConfigLoadStart) {
              this.loaderService.showLoading();
            } else if (event instanceof RouteConfigLoadEnd) {
              this.loaderService.hideLoading();
            }
          }),
          takeUntil(this.destroy$),
          delay(2000)
        )
        .subscribe();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(false);
    this.destroy$.complete();
  }
}
