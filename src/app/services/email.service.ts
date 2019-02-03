import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/email/send', {email: 'SUBJECT TO CHANGE'});
  }
}
