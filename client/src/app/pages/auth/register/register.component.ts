import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';

import { authActions, selectIsLoading } from '@store/auth';
import { passwordMatchValidator } from '../validations/passwords-match';
import { IRegister } from '@app/models';

import {
  markFormGroupTouched,
  regex,
  regexErrors,
  PasswordComponent,
  InputComponent,
  FormGroupComponent,
} from '@app/shared';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    RouterLink,
    FormGroupComponent,
    InputComponent,
    PasswordComponent,
  ],
})
export class RegisterComponent {
  fb = inject(FormBuilder);

  store = inject(Store);

  regexErrors = regexErrors;

  data$ = combineLatest({
    isLoading: this.store.select(selectIsLoading),
  });

  form = this.fb.nonNullable.group(
    {
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(regex.email)]],
      password: ['', [Validators.required, Validators.pattern(regex.password)]],
      confirm_password: [
        '',
        [Validators.required, Validators.pattern(regex.password)],
      ],
      mobile: ['', [Validators.minLength(5)]],
    },
    { validators: [passwordMatchValidator()] }
  );

  submit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    const request: IRegister = {
      email: this.form.getRawValue().email,
      firstname: this.form.getRawValue().firstname,
      lastname: this.form.getRawValue().lastname,
      password: this.form.getRawValue().password,
      mobile: this.form.getRawValue().mobile,
    };

    this.store.dispatch(authActions.register({ request }));
  }
}
