import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import { selectAuthUser } from '@app/store/auth';
import { IUser } from '@app/models';
import { Icons } from '@app/shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [RouterLink, RouterOutlet, FontAwesomeModule],
})
export class ProfileComponent implements OnInit, OnDestroy {
  user!: IUser;
  destroy$ = new Subject();
  store = inject(Store);

  icons = Icons;

  ngOnInit(): void {
    this._getCurrentUser();
  }

  _getCurrentUser() {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.user = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
