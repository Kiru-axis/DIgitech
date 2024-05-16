import { Component, OnInit, OnDestroy } from '@angular/core';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { ICartData, IUser } from '@app/models';
import { customerActions, selectCartData } from '@app/store/customer';
import { ToastrService } from 'ngx-toastr';
import { selectAuthUser } from '@app/store/auth';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    FormsModule,
    CurrencyPipe,
    SlicePipe,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  coupon = '';

  coup = new FormControl('');

  user!: IUser;

  destroy$ = new Subject();

  cartData!: ICartData | undefined | null;

  form = this.fb.nonNullable.group({
    firstname: '',
    lastname: '',
    address1: '',
    city: '',
    state: '',
    zipCode: 0,
    other: '',
    address2: '',
  });

  ngOnInit(): void {
    this._getCurrentUser();
    this._patchForm();
    this._getUserCart();
  }

  checkout() {
    // check if there are prods in the cart
    if (this.cartData?.cart?.length) {
      if (this.user.Address) {
        this.store.dispatch(customerActions.createOrder({}));
        // this.router.navigateByUrl('/profile');
      } else {
        this.toastr.info("You're being redirected to address form");
        this.router.navigateByUrl('/profile/address');
        return;
      }
    }

    // if no prods rediect back to store
    else {
      this.router.navigateByUrl('/store');
    }
  }

  private _getCurrentUser(): void {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.user = res;
        }
      });
  }

  private _patchForm(): void {
    if (!this.user.Address) {
      return;
    }

    if (this.user.Address) {
      this.form.patchValue({
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        address1: this.user.Address.address1,
        city: this.user.Address.city,
        state: this.user.Address.state,
        zipCode: this.user.Address.zipCode,
        other: this.user.Address.other || '', //optional values in the model
        address2: this.user.Address.address2 || '', //optional values in the model
      });
    }
    this.form.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
    });
    // this.form.disable();
  }

  private _getUserCart(): void {
    this.store
      .select(selectCartData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.cartData = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
