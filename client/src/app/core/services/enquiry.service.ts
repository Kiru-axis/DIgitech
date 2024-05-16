import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBackendSuccess, ICreateEnquiry } from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  url = environment.server_url + '/enquiries';

  constructor(private http: HttpClient) {}

  createEnquiry(dto: ICreateEnquiry): Observable<IBackendSuccess> {
    return this.http.post<IBackendSuccess>(this.url, dto);
  }
}
