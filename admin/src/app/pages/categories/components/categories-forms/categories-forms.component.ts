import { Component, Inject, OnInit } from '@angular/core';
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
import { IProductCategory } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';

@Component({
  selector: 'app-categories-forms',
  standalone: true,
  templateUrl: './categories-forms.component.html',
  styleUrl: './categories-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class CategoriesFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<CategoriesFormsComponent>
  ) {}

  formType: formType = 'Add';

  deleteProductCategory!: IProductCategory;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteProductCategory) {
      this.deleteProductCategory = this.dialogData.deleteProductCategory;
    }
  }

  addNewProductCategory() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    this.store.dispatch(
      productActions.createProductCategory({
        request: {
          name: String(this.addForm.getRawValue().name),
        },
      })
    );

    this.dialogRef.close();
  }

  onDeleteProductCategory() {
    this.store.dispatch(
      productActions.deleteProductCategory({
        request: { categoryId: this.deleteProductCategory.id },
      })
    );

    this.dialogRef.close();
  }
}
