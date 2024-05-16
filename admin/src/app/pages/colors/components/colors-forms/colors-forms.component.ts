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
import { IColor } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';
@Component({
  selector: 'app-colors-forms',
  standalone: true,
  templateUrl: './colors-forms.component.html',
  styleUrl: './colors-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ColorsFormsComponent {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ColorsFormsComponent>
  ) {}

  formType: formType = 'Add';

  deleteColor!: IColor;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteColor) {
      this.deleteColor = this.dialogData.deleteColor;
    }
  }

  addNewColor() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    this.store.dispatch(
      productActions.createColor({
        request: {
          name: String(this.addForm.getRawValue().name),
        },
      })
    );

    this.dialogRef.close();
  }

  onDeleteColor() {
    this.store.dispatch(
      productActions.deleteColor({
        request: { colorId: this.deleteColor.id },
      })
    );

    this.dialogRef.close();
  }
}
