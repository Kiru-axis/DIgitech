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
import { blogActions } from '@app/store/blogs';
import { IBlogCategory } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';
@Component({
  selector: 'app-blog-category-forms',
  standalone: true,
  templateUrl: './blog-category-forms.component.html',
  styleUrl: './blog-category-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class BlogCategoryFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<BlogCategoryFormsComponent>
  ) {}

  formType: formType = 'Add';

  deleteBlogCategory!: IBlogCategory;

  addForm = this.fb.group({
    name: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteBlogCategory) {
      this.deleteBlogCategory = this.dialogData.deleteBlogCategory;
    }
  }

  addNewBlogCategory() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    this.store.dispatch(
      blogActions.createBlogCategory({
        request: {
          name: String(this.addForm.getRawValue().name),
        },
      })
    );

    this.dialogRef.close();
  }

  onDeleteBlogCategory() {
    this.store.dispatch(
      blogActions.deleteBlogCategory({
        request: { categoryId: this.deleteBlogCategory.id },
      })
    );

    this.dialogRef.close();
  }
}
