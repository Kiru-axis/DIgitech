import { Component, inject } from '@angular/core';
import { IWishlist } from '@app/models';
import { WishlistComponent } from '@app/pages/customer/wishlist/wishlist.component';
import { customerActions, selectWishlist } from '@app/store/customer';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-wishlist',
  standalone: true,
  imports: [WishlistComponent],
  template: `
    <div class="overflow-hidden p-2 p-md-4">
      @if(wishlist.length){
      <button (click)="clearWishlist()" class="button-warn m-2">Clear</button>
      }

      <app-wishlist [showBreadcrumbs]="false"></app-wishlist>
    </div>
  `,
})
export class UserWishlistComponent {
  store = inject(Store);

  destroy$ = new Subject();

  wishlist: IWishlist[] = [];

  clearWishlist() {
    this.store.dispatch(customerActions.clearWishlist());
  }

  ngOnInit(): void {
    this.store
      .select(selectWishlist)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.wishlist = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
