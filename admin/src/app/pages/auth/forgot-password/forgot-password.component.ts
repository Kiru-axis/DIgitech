import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { FormGroupComponent, InputComponent } from '@shared/index';

import { markFormGroupTouched, regex, regexErrors } from '@app/shared';
import { authActions, selectIsLoading } from '@app/store/auth';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormGroupComponent,
    InputComponent,
  ],
})
export class ForgotPasswordComponent {
  fb = inject(FormBuilder);

  store = inject(Store);

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
