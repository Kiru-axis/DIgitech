import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { IUser } from '@app/models';
import { selectAuthUser } from '@store/auth';
import { transformToControl } from './utils';
import { profileActions } from '@app/store/profile';

import {
  SelectComponent,
  InputComponent,
  Countries,
  FormGroupComponent,
} from '@app/shared';

@Component({
  selector: 'app-user-address',
  standalone: true,
  templateUrl: './user-address.component.html',
  styleUrl: './user-address.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FormGroupComponent,
    InputComponent,
    SelectComponent,
  ],
})
export class UserAddressComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private fb: FormBuilder) {}

  countries = transformToControl(Countries);

  regexErrors = regexErrors;

  destroy$ = new Subject();

  user!: IUser;

  form = this.fb.nonNullable.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    address1: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    zipCode: [
      0,
      [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(regex.numbers),
      ],
    ],
    other: null,
    address2: null,
  });

  ngOnInit(): void {
    this._getUser();
    this._patchForm();
  }

  submit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    this.store.dispatch(
      profileActions.createAddress({
        request: {
          ...this.form.getRawValue(),
          zipCode: Number(this.form.getRawValue().zipCode),
        },
      })
    );
  }

  private _patchForm() {
    this.form.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
    });
  }

  private _getUser(): void {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.user = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
