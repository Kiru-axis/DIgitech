import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { InputComponent, FormGroupComponent } from '@app/shared';
import { userActions } from '@app/store/user';
import { IUser } from '@app/models';
import { MatButtonModule } from '@angular/material/button';

type formType = 'Edit' | 'Delete';

@Component({
  selector: 'app-user-forms',
  standalone: true,
  templateUrl: './user-forms.component.html',
  styleUrl: './user-forms.component.scss',
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    InputComponent,
    FormGroupComponent,
    MatDialogModule,
    MatButtonModule,
  ],
})
export class UserFormsComponent implements OnInit {
  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private dialogRef: MatDialogRef<UserFormsComponent>
  ) {}

  formType: formType = 'Edit';

  deleteUser!: IUser;

  editUser!: IUser;

  ngOnInit(): void {
    this.formType = this.dialogData.formType;

    if (this.dialogData.deleteUser) {
      this.deleteUser = this.dialogData.deleteUser;
    }
    if (this.dialogData.editUser) {
      this.editUser = this.dialogData.editUser;
    }
  }

  onDeleteUser() {
    this.store.dispatch(
      userActions.deleteUser({
        userId: this.deleteUser.id,
      })
    );

    this.dialogRef.close();
  }

  onEditUser() {
    if (this.editUser.blocked) {
      this.store.dispatch(
        userActions.unblockBlockUser({
          userId: this.editUser.id,
        })
      );
      this.dialogRef.close();
      return;
    } else if (!this.editUser.blocked) {
      this.store.dispatch(
        userActions.blockUser({
          userId: this.editUser.id,
        })
      );
      this.dialogRef.close();
    }
  }
}
