import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ICompare } from '@app/models';
import { CompareComponent } from '@app/pages/customer/compare/compare.component';
import { customerActions, selectCompares } from '@app/store/customer';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-compare',
  standalone: true,
  imports: [CompareComponent],
  template: `
    <div class="overflow-hidden p-2 p-md-4">
      @if(this.compares.length){
      <button (click)="clearCompares()" class="button-warn m-2">Clear</button>
      }

      <app-compare [showBreadcrumbs]="false"></app-compare>
    </div>
  `,
})
export class UserCompareComponent implements OnInit, OnDestroy {
  store = inject(Store);

  destroy$ = new Subject();

  compares: ICompare[] = [];

  clearCompares() {
    this.store.dispatch(customerActions.clearCompare());
  }

  ngOnInit(): void {
    this.store
      .select(selectCompares)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.compares = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
