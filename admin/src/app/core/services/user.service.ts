import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser, UsersQueryType } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  url = environment.server_url + '/users';

  constructor(private http: HttpClient) {}

  getAllUsers(query?: UsersQueryType): Observable<IUser[]> {
    const obj = {
      fname: '',
      lname: '',
      mobile: '',
      email: '',
      page: '',
      limit: '',
    };

    if (query) {
      obj.fname = String(query.fname);
      obj.lname = String(query.lname);
      obj.mobile = String(query.mobile);
      obj.email = String(query.email);
      obj.page = String(query.page);
      obj.limit = String(query.limit);
    }

    let params = new HttpParams({ fromObject: obj });

    return this.http.get<IUser[]>(this.url, { params });
  }

  getSingleUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/admin/${userId}`);
  }

  deleteUser(userId: string): Observable<IUser> {
    return this.http.delete<IUser>(`${this.url}/${userId}`);
  }

  blockUser(userId: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/block/${userId}`, {});
  }

  unblockUser(userId: string): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/unblock/${userId}`, {});
  }
}
