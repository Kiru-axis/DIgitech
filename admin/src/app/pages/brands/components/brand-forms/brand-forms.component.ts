import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  InputComponent,
  FormGroupComponent,
  markFormGroupTouched,
} from '@app/shared';
import { productActions } from '@app/store/products';
import { IProductBrand } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';

@Component({
  selector: 'app-brand-forms',
  standalone: true,
  templateUrl: './brand-forms.component.html',
  styleUrl: './brand-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class BrandFormsComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<BrandFormsComponent>
  ) {}

  formType: formType = 'Add';

  deleteProductBrand!: IProductBrand;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteProductBrand) {
      this.deleteProductBrand = this.dialogData.deleteProductBrand;
    }
  }

  addNewProductBrand() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    this.store.dispatch(
      productActions.createBrand({
        request: {
          name: String(this.addForm.getRawValue().name),
        },
      })
    );

    this.dialogRef.close();
  }

  onDeleteProductBrand() {
    this.store.dispatch(
      productActions.deleteBrand({
        request: { brandId: this.deleteProductBrand.id },
      })
    );

    this.dialogRef.close();
  }
}
