import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import {
  FormGroupComponent,
  markFormGroupTouched,
  InputComponent,
  regex,
  regexErrors,
} from '@app/shared';
import { IUpdateUser, IUser } from '@app/models';
import { selectAuthUser } from '@app/store/auth';
import { profileActions } from '@app/store/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss',
  imports: [ReactiveFormsModule, FormGroupComponent, InputComponent],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {}

  selectedFile!: File | null;

  imagePreview!: string | ArrayBuffer | null;

  user!: IUser;

  regexErrors = regexErrors;

  destroy$ = new Subject();

  editUserForm = this.fb.nonNullable.group({
    firstname: '',
    lastname: '',
    email: ['', [Validators.pattern(regex.email)]],
    mobile: '',
  });

  editAddressForm = this.fb.nonNullable.group({
    firstname: [''],
    lastname: [''],
    address1: [''],
    city: [''],
    state: [''],
    other: '',
    address2: '',
    zipCode: [0, [Validators.minLength(4), Validators.pattern(regex.numbers)]],
  });

  ngOnInit(): void {
    this.getUser();
    this.patchUserEditForm();

    // only patch the form isf thr user has address
    if (this.user.Address) {
      this.patchUserAddressForm();
    }
  }

  onSelectFile(e: Event) {
    const input = e.target as HTMLInputElement;

    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.previewImage();
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(this.selectedFile as File | Blob);
  }

  submitUserUpdate() {
    if (this.editUserForm.invalid) {
      markFormGroupTouched(this.editUserForm);
      return;
    }

    const fd = new FormData();
    const form = this.editUserForm.getRawValue();
    fd.append('firstname', form.firstname);
    fd.append('lastname', form.lastname);
    fd.append('email', form.email);
    fd.append('mobile', form.mobile);
    fd.append('image', this.selectedFile as File);

    this.store.dispatch(
      profileActions.updateUser({ request: fd as unknown as IUpdateUser })
    );
  }

  submitAddressUpdate() {
    if (!this.user.Address) {
      this.router.navigateByUrl('/profile/address');
      return;
    }
    if (this.editAddressForm.invalid) {
      markFormGroupTouched(this.editAddressForm);
      return;
    }

    this.store.dispatch(
      profileActions.updateAddress({
        request: this.editAddressForm.getRawValue(),
      })
    );
  }

  private patchUserEditForm() {
    this.editUserForm.patchValue({
      email: this.user.email,
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      mobile: this.user.mobile,
    });
  }
  private patchUserAddressForm() {
    this.editAddressForm.patchValue({
      firstname: this.user.firstname,
      lastname: this.user.lastname,
      address1: this.user.Address?.address1,
      address2: this.user.Address?.address2,
      zipCode: this.user.Address?.zipCode,
      city: this.user.Address?.city,
      state: this.user.Address?.state,
      other: this.user.Address?.other,
    });
  }

  private getUser(): void {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        if (data) {
          this.user = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
