import { Component, Inject, OnInit } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, combineLatest } from 'rxjs';

import {
  InputComponent,
  FormGroupComponent,
  regex,
  regexErrors,
  markFormGroupTouched,
  TextAreaComponent,
  SelectComponent,
} from '@app/shared';
import { IControlItem, ICreateProduct, IProduct, IUser } from '@app/models';
import {
  productActions,
  selectBrands,
  selectColors,
  selectProductCategory,
  selectTags,
} from '@app/store/products';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Add' | 'Edit' | 'Delete';

@Component({
  selector: 'app-product-forms',
  standalone: true,
  templateUrl: './product-forms.component.html',
  styleUrl: './product-forms.component.scss',
  imports: [
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    TextAreaComponent,
    SelectComponent,
    AsyncPipe,
    JsonPipe,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class ProductFormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<ProductFormsComponent>
  ) {}

  selectedFiles!: FileList;

  regexErrors = regexErrors;

  formType: formType = 'Add';

  editProduct!: IProduct;

  deleteProduct!: IProduct;

  data$ = combineLatest({
    tags: this.store
      .select(selectTags)
      .pipe(map((data) => data?.map((x) => this.transFormToControl(x)))),
    categories: this.store
      .select(selectProductCategory)
      .pipe(map((data) => data?.map((x) => this.transFormToControl(x)))),
    colors: this.store
      .select(selectColors)
      .pipe(map((data) => data?.map((x) => this.transFormToControl(x)))),
    brands: this.store
      .select(selectBrands)
      .pipe(map((data) => data?.map((x) => this.transFormToControl(x)))),
  });

  addForm = this.fb.group({
    title: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.pattern(regex.numbers)]],
    quantity: ['', [Validators.required, Validators.pattern(regex.numbers)]],
    brandId: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    colors: ['', [Validators.required]],
    tags: ['', [Validators.required]],
  });

  editForm = this.fb.group({
    title: '',
    desc: '',
    price: [0, [Validators.pattern(regex.numbers)]],
    quantity: [0, [Validators.pattern(regex.numbers)]],
    brandId: '',
    categoryId: '',
    colors: '',
    tags: '',
  });

  ngOnInit(): void {
    this.formType = this.dialogData.formType;
    if (this.dialogData.editProduct) {
      this.editProduct = this.dialogData.editProduct;
    }
    if (this.dialogData.deleteProduct) {
      this.deleteProduct = this.dialogData.deleteProduct;
    }

    this.initializeEditProduct();
  }

  onSelectFiles(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      this.selectedFiles = input.files;
    }
  }

  addNewProduct() {
    if (this.addForm.invalid) {
      markFormGroupTouched(this.addForm);
      return;
    }

    const data = this.addForm.getRawValue();
    // backend requires tags and names in the following format.
    const tags: { name: string }[] = [];

    const colors: { name: string }[] = [];

    if (data.colors?.length && data.tags?.length) {
      for (let c of data.colors) {
        const d = Object.assign({}, { name: c });
        colors.push(d);
      }
      for (let c of data.tags) {
        const d = Object.assign({}, { name: c });
        tags.push(d);
      }
    }
    const formData = new FormData();

    for (let i = 0; i < this.selectedFiles.length; i++) {
      const el = this.selectedFiles[i];
      formData.append('images', el);
    }

    // Since images are uploaded, The request has to be formData
    formData.append('title', String(data.title));
    formData.append('desc', String(data.desc));
    formData.append('brandId', String(data.brandId));
    formData.append('categoryId', String(data.categoryId));
    formData.append('price', String(data.price));
    formData.append('quantity', String(data.quantity));
    formData.append('colors', JSON.stringify(colors));
    formData.append('tags', JSON.stringify(tags));

    this.store.dispatch(
      productActions.createProduct({
        request: formData as unknown as ICreateProduct,
      })
    );

    this.dialogRef.close();
  }

  onEditProduct() {
    if (this.editForm.invalid) {
      markFormGroupTouched(this.editForm);
      return;
    }

    const edit_form = this.editForm.getRawValue();

    this.store.dispatch(
      productActions.updateProduct({
        request: {
          dto: {
            title: edit_form.title ?? '',
            desc: edit_form.desc ?? '',
            price: Number(edit_form.price) ?? 0,
            quantity: Number(edit_form.quantity) ?? 0,
          },
          productId: this.editProduct.id,
        },
      })
    );

    const data = (user: Partial<IUser>) => {
      return Object.assign({}, user);
    };

    this.dialogRef.close();
  }

  onDeleteProduct() {
    this.store.dispatch(
      productActions.deleteProduct({
        request: { productId: this.deleteProduct.id },
      })
    );

    this.dialogRef.close();
  }

  private initializeEditProduct() {
    if (this.editProduct) {
      const p = this.editProduct;

      this.editForm.setValue({
        brandId: p.Brand.id,
        categoryId: p.Category.id,
        desc: p.desc,
        price: p.price,
        quantity: p.quantity,
        title: p.title,
        colors: this.transformFromControl(p.Colors),
        tags: this.transformFromControl(p.Tags),
      });

      this.transformFromControl(p.Colors);
    }
  }

  private transFormToControl(data: any): IControlItem {
    return Object.assign({}, { label: data.name, value: data.id });
  }
  private transformFromControl(data: any) {
    return data.map((x: any) => x.name);
  }
}
