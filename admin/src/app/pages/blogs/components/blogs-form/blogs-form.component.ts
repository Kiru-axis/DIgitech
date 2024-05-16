import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { map, combineLatest } from 'rxjs';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { IBlog, IControlItem, ICreateBlog } from '@app/models';
import { blogActions, selectBlogCategories } from '@app/store/blogs';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroupComponent,
  InputComponent,
  SelectComponent,
  TextAreaComponent,
  markFormGroupTouched,
} from '@app/shared';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

type formType = 'Add' | 'Edit' | 'Delete';

@Component({
  selector: 'app-blogs-form',
  standalone: true,
  templateUrl: './blogs-form.component.html',
  styleUrl: './blogs-form.component.scss',
  imports: [
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    TextAreaComponent,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule,
    AsyncPipe,
    FormGroupComponent,
  ],
})
export class BlogsFormComponent implements OnInit {
  constructor(
    private store: Store,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<BlogsFormComponent>
  ) {}

  data$ = combineLatest({
    categories: this.store
      .select(selectBlogCategories)
      .pipe(map((data) => data?.map((x) => this.transFormToControl(x)))),
  });

  formType: formType = 'Add';

  deleteBlog!: IBlog;

  selectedFile!: File | null;

  addForm = this.fb.group({
    title: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;
    if (this.dialogData.deleteBlog) {
      this.deleteBlog = this.dialogData.deleteBlog;
    }
  }

  onSelectFile(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input?.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  addNewBlog() {
    const data = this.addForm.getRawValue();

    const formData = new FormData();
    formData.append('title', String(data.title));
    formData.append('desc', String(data.desc));
    formData.append('categoryId', String(data.categoryId));
    formData.append('image', this.selectedFile as File);

    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    // since images is not required for a blog.
    if (this.selectedFile) {
      this.store.dispatch(
        blogActions.createBlog({ request: formData as unknown as ICreateBlog })
      );
      this.dialogRef.close();
    } else {
      this.store.dispatch(
        blogActions.createBlog({
          request: {
            categoryId: String(data.categoryId),
            title: String(data.title),
            desc: String(data.desc),
          },
        })
      );
      this.dialogRef.close();
    }
  }

  onDeleteBlog() {
    this.store.dispatch(
      blogActions.deleteBlog({
        request: { blogId: this.deleteBlog.id },
      })
    );

    this.dialogRef.close();
  }

  private transFormToControl(data: any): IControlItem {
    return Object.assign({}, { label: data.name, value: data.id });
  }
}
