import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';

import { enquiryActions } from '@app/store/enquiry';

import {
  Icons,
  markFormGroupTouched,
  regex,
  regexErrors,
  FormGroupComponent,
  InputComponent,
  TextAreaComponent,
} from '@app/shared';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.scss',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    FontAwesomeModule,
    FormGroupComponent,
    InputComponent,
    TextAreaComponent,
  ],
})
export class EnquiryComponent {
  fb = inject(FormBuilder);

  icons = Icons;

  regexErrors = regexErrors;

  store = inject(Store);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern(regex.email)]],
    mobile: ['', [Validators.required]],
    comment: ['', [Validators.required]],
  });

  submit() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      return;
    }

    this.store.dispatch(
      enquiryActions.createEnquiry({ request: this.form.getRawValue() })
    );
  }
}
