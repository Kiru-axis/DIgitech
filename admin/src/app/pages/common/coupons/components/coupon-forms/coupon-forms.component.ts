import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  DateComponent,
  FormGroupComponent,
  InputComponent,
  markFormGroupTouched,
  regex,
  regexErrors,
} from '@app/shared';
import { commonActions } from '@app/store/common';
import { ICoupon } from '@app/models';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';

@Component({
  selector: 'app-coupon-forms',
  standalone: true,
  templateUrl: './coupon-forms.component.html',
  styleUrl: './coupon-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    DateComponent,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    JsonPipe,
    MatButtonModule,
  ],
})
export class CouponFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<CouponFormsComponent>
  ) {}

  formType: formType = 'Add';

  deleteCoupon!: ICoupon;

  regexErrors = regexErrors;

  addForm = this.fb.group({
    code: ['', [Validators.required]],
    discount: [
      '',
      [
        Validators.required,
        Validators.pattern(regex.numbers),
        Validators.min(1),
        Validators.max(99),
      ],
    ],
    expiresAt: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteCoupon) {
      this.deleteCoupon = this.dialogData.deleteCoupon;
    }
  }

  addNewCoupon() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    const data = this.addForm.getRawValue();

    this.store.dispatch(
      commonActions.createCoupon({
        request: {
          code: String(data.code),
          discount: Number(data.discount),
          expiresAt: data.expiresAt ? new Date(data.expiresAt) : new Date(),
        },
      })
    );

    this.dialogRef.close();
  }

  ondeleteCoupon() {
    this.store.dispatch(
      commonActions.deleteCoupon({
        couponId: this.deleteCoupon.id,
      })
    );

    this.dialogRef.close();
  }
}
