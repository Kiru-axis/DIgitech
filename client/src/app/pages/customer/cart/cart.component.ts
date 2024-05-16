import { AsyncPipe, CurrencyPipe, SlicePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ICartData, IDeleteCartProduct } from '@app/models';
import { customerActions, selectCartData } from '@store/customer';
import { Icons, QtyCounterComponent } from '@app/shared';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    SlicePipe,
    CurrencyPipe,
    RouterLink,
    QtyCounterComponent,
    FontAwesomeModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  store = inject(Store);

  icons = Icons;

  quantity = 0;

  cartData$!: Observable<ICartData | undefined | null>;

  ngOnInit(): void {
    this.cartData$ = this.store.select(selectCartData);
  }

  removeProductFromCart(dto: IDeleteCartProduct) {
    this.store.dispatch(
      customerActions.removeProductFromCart({ request: dto })
    );
  }

  clearCart() {
    this.store.dispatch(customerActions.clearCart());
  }

  updateCart(quantity: number, cartId: string) {
    this.store.dispatch(
      customerActions.updateCart({ request: { cartId, quantity } })
    );
  }
}
