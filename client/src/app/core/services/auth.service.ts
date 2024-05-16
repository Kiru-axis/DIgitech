import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  IBackendSuccess,
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword,
  IUser,
} from '@app/models';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  http = inject(HttpClient);

  url = environment.server_url + '/auth';

  login(dto: ILogin): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/signin`, dto);
  }

  register(dto: IRegister): Observable<IBackendSuccess> {
    return this.http.post<IBackendSuccess>(`${this.url}/signup`, dto);
  }

  logout(): Observable<{}> {
    return this.http.post<{}>(`${this.url}/signout`, {});
  }

  refresh(): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/refresh`, {});
  }

  // forgot password
  forgotPassword(dto: IForgotPassword): Observable<IBackendSuccess> {
    return this.http.post<IBackendSuccess>(`${this.url}/forgot-password`, dto);
  }

  resetPassword(
    dto: IResetPassword,
    token: string
  ): Observable<IBackendSuccess> {
    return this.http.post<IBackendSuccess>(
      `${this.url}/reset-password/${token}`,
      dto
    );
  }
}
