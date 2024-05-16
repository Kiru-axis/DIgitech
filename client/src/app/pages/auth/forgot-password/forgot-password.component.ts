import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { authActions, selectIsLoading } from '@app/store/auth';
import {
  markFormGroupTouched,
  regex,
  regexErrors,
  FormGroupComponent,
  InputComponent,
} from '@app/shared';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [
    RouterLink,
    FormGroupComponent,
    InputComponent,
    ReactiveFormsModule,
    AsyncPipe,
  ],
})
export class ForgotPasswordComponent {
  constructor(private fb: FormBuilder, private store: Store) {}

  regexErrors = regexErrors;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
  });

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern(regex.email)]],
  });

  submit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    this.store.dispatch(
      authActions.forgotPassword({ request: this.form.getRawValue() })
    );
  }
}
