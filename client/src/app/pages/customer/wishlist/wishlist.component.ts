import { AsyncPipe, CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ICreateWishlist, IWishlist } from '@app/models';
import { customerActions, selectWishlist } from '@store/customer';
import { ColorComponent } from '@app/shared';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [SlicePipe, AsyncPipe, CurrencyPipe, ColorComponent, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  store = inject(Store);

  showBreadcrumbs = input<boolean>(true);

  wishlist$!: Observable<IWishlist[] | null | undefined>;

  removeFromWishlist(dto: ICreateWishlist) {
    this.store.dispatch(customerActions.removeFromWishlist({ request: dto }));
  }

  ngOnInit(): void {
    this.store.dispatch(customerActions.getWishlist());
    this.wishlist$ = this.store.select(selectWishlist);
  }
}
