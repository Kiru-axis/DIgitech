import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { userActions, selectDbUser } from '@app/store/user';
import { Store } from '@ngrx/store';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UserFormsComponent } from '../users/components/user-forms/user-forms.component';
import { IUser } from '@app/models';
import { ColorComponent, RatingComponent } from '@app/shared';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  imports: [
    MatDialogModule,
    MatCardModule,
    RatingComponent,
    CurrencyPipe,
    ColorComponent,
    UserFormsComponent,
    MatButtonModule,
    MatTabsModule,
    DatePipe,
  ],
})
export class UserComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  destroy$ = new Subject();

  user!: IUser;

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((data) => {
          this.store.dispatch(
            userActions.getSingleUser({
              userId: String(data.get('id')),
            })
          );
          return this.store.select(selectDbUser);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.user = data;
          console.log(data);
        }
      });
  }

  openEditDialog(user: IUser) {
    this.dialog.open(UserFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Edit',
        editUser: user,
      },
    });
  }

  openDeleteDialog(user: IUser) {
    this.dialog.open(UserFormsComponent, {
      width: '40%',
      height: '40%',
      enterAnimationDuration: 500,
      data: {
        formType: 'Delete',
        deleteUser: user,
      },
    });
  }
  ngOnDestroy() {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
