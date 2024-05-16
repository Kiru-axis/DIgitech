import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatMenuModule } from '@angular/material/menu';
import { NavData } from './data';
import { Icons } from '@app/shared';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IUser } from '@app/models';
import { Store } from '@ngrx/store';
import { authActions, selectAuthUser } from '@app/store/auth';
// import {} from "@angular/material"

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    FontAwesomeModule,
    RouterLink,
    AsyncPipe,
    MatMenuModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  constructor(private store: Store) {}

  navData = NavData;

  icons = Icons;

  user$: Observable<IUser | null | undefined> =
    this.store.select(selectAuthUser);

  logout() {
    this.store.dispatch(authActions.logout());
  }

  refreshAccessToken() {
    this.store.dispatch(authActions.refreshToken());
  }
}
