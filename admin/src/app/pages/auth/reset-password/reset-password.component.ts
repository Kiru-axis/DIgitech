import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, combineLatest, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FormGroupComponent, PasswordComponent } from '@shared/index';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { authActions, selectIsLoading } from '@app/store/auth';
import { passwordMatchValidator } from '../validations/passwords-match';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    FormGroupComponent,
    PasswordComponent,
  ],
})
export class ResetPasswordComponent implements OnDestroy, OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private activatedRoute: ActivatedRoute
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
