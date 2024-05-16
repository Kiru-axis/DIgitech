import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICreateAddress, IUser } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  url = environment.server_url + '/users';

  constructor(private http: HttpClient) {}

  createAddress(dto: ICreateAddress): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/address`, dto);
  }

  updateAddress(dto: Partial<ICreateAddress>): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/address/update`, dto);
  }

  updateUser(dto: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${this.url}/user/update`, dto);
  }
}
