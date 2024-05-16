import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateEnquiry, IEnquiryResponse } from '@app/models';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  url = environment.server_url + '/enquiries';

  constructor(private http: HttpClient) {}

  createEnquiry(dto: ICreateEnquiry): Observable<IEnquiryResponse> {
    return this.http.post<IEnquiryResponse>(this.url, dto);
  }
}
