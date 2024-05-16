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
import { ITag } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';

@Component({
  selector: 'app-tag-forms',
  standalone: true,
  templateUrl: './tag-forms.component.html',
  styleUrl: './tag-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class TagFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<TagFormsComponent>
  ) {}

  formType: formType = 'Add';

  deleteTag!: ITag;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteTag) {
      this.deleteTag = this.dialogData.deleteTag;
    }
  }

  addNewTag() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    this.store.dispatch(
      productActions.createTag({
        request: {
          name: String(this.addForm.getRawValue().name),
        },
      })
    );

    this.dialogRef.close();
  }

  onDeleteTag() {
    this.store.dispatch(
      productActions.deleteTag({
        request: { tagId: this.deleteTag.id },
      })
    );

    this.dialogRef.close();
  }
}
