import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import {
  markFormGroupTouched,
  regex,
  regexErrors,
  PasswordComponent,
  FormGroupComponent,
} from '@app/shared';
import { passwordMatchValidator } from '../validations/passwords-match';
import { AsyncPipe } from '@angular/common';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { authActions, selectIsLoading } from '@app/store/auth';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe,
    ReactiveFormsModule,
    FormGroupComponent,
    PasswordComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store
  ) {}

  regexErrors = regexErrors;

  destroy$ = new Subject();

  // Get the token from the route
  resetToken = '';

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
  });

  form = this.fb.nonNullable.group(
    {
      password: ['', [Validators.required, Validators.pattern(regex.password)]],
      confirm_password: [
        '',
        [Validators.required, Validators.pattern(regex.password)],
      ],
    },
    { validators: [passwordMatchValidator()] }
  );

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        this.resetToken = String(d.get('token'));
      });
  }

  submit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    this.store.dispatch(
      authActions.resetPassword({
        request: {
          dto: { password: this.form.getRawValue().password },
          token: this.resetToken,
        },
      })
    );
  }

  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
