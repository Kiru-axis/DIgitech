import { CurrencyPipe, NgClass, NgStyle, SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { Icons } from '@app/shared';
import { ICartData, IDeleteCartProduct, IUser } from '@app/models';
import { authActions, selectAuthUser } from '@app/store/auth';
import { customerActions, selectCartData } from '@app/store/customer';
import { selectProducts } from '@app/store/products';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    RouterLink,
    FontAwesomeModule,
    SlicePipe,
    CurrencyPipe,
    NgClass,
    NgStyle,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private router: Router) {}

  destroy$ = new Subject();

  language = 'English';

  currency = 'USD';

  icons = Icons;

  user!: IUser | null | undefined;

  userCartData!: ICartData | undefined | null;

  ngOnInit(): void {
    this._getCurrentUser();
  }

  setLanguage(newLang: string) {
    this.language = newLang;
  }
  setCurrency(newCurr: string) {
    this.currency = newCurr;
  }

  onGlobalProductSearch(e: Event) {
    const term = (e.target as HTMLInputElement).value;
    if (term.length > 1) {
      this.router.navigate(['/store']);
      this.store
        .select(selectProducts)
        .pipe(takeUntil(this.destroy$))
        .subscribe((d) => {
          let found = d.filter((prod) =>
            prod.title.toLowerCase().includes(term.toLowerCase())
          );

          if (found.length) {
            this.router.navigate([`/store/${found[0].id}`]);
          }
        });
    } else {
      this.router.navigate(['/']);
    }
  }

  removeProductFromCart(dto: IDeleteCartProduct) {
    this.store.dispatch(
      customerActions.removeProductFromCart({ request: dto })
    );
  }

  logout() {
    this.store.dispatch(authActions.logout());
    this.user = null;
    this.userCartData = null;
  }

  refreshAccessToken() {
    this.store.dispatch(authActions.refreshToken());
  }

  private _getCurrentUser() {
    // can be improved
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.store.dispatch(customerActions.getCart());
          this.store
            .select(selectCartData)
            .pipe(takeUntil(this.destroy$))
            .subscribe((cart) => {
              if (cart) {
                if (cart) this.userCartData = cart;
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
