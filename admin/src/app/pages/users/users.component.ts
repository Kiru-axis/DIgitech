import { JsonPipe, NgStyle, SlicePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { IUser } from '@app/models';
import { Icons, ColorComponent } from '@app/shared';
import { UserFormsComponent } from './components/user-forms/user-forms.component';
import { selectDbUsers, userActions } from '@app/store/user';
import { MatButtonModule } from '@angular/material/button';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  imports: [
    RouterLink,
    JsonPipe,
    MatTableModule,
    ColorComponent,
    FontAwesomeModule,
    MatPaginatorModule,
    MatSortModule,
    SlicePipe,
    MatCardModule,
    RouterLink,
    NgStyle,
    MatButtonModule,
    ClipboardModule,
  ],
})
export class UsersComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private dialog: MatDialog) {}

  destroy$ = new Subject();

  paginator = viewChild<MatPaginator>(MatPaginator);

  sort = viewChild<MatSort>(MatSort);

  // Mat table config
  displayColumms: string[] = [
    'Id',
    'Image',
    'First Name',
    'Last Name',
    'Email',
    'Mobile',
    'Blocked',
    'Actions',
  ];

  dataSource: any;

  users: IUser[] = [];

  icons = Icons;

  ngOnInit(): void {
    this.getUsers();
  }

  filterChange(e: any) {
    this.dataSource.filter = e.target.value;
  }

  private getUsers() {
    this.store.dispatch(userActions.getAllUsers({}));
    this.store
      .select(selectDbUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe((d) => {
        if (d) {
          this.users = d;
          this.dataSource = new MatTableDataSource<IUser>(this.users);
          this.dataSource.paginator = this.paginator();
          this.dataSource.sort = this.sort();
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

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
