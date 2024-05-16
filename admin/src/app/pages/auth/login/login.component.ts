import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import {
  FormGroupComponent,
  InputComponent,
  PasswordComponent,
} from '@shared/index';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { authActions, selectIsLoading } from '@app/store/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    FormGroupComponent,
    InputComponent,
    PasswordComponent,
  ],
})
export class LoginComponent {
  fb = inject(FormBuilder);

  store = inject(Store);

  regexErrors = regexErrors;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
  });

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.pattern(regex.email)]],
    password: ['', [Validators.required, Validators.pattern(regex.password)]],
  });

  submit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    this.store.dispatch(
      authActions.login({ request: this.form.getRawValue() })
    );
  }
}
