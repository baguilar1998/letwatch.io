import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private invitationCode;

  constructor(private http: HttpClient) { }

  generateInvitationCode() {
    this.http.get<{invitation: any}>('//localhost:3000/api/room/invitation').subscribe((data) => {
      this.invitationCode = data.invitation;
      console.log(this.invitationCode);
    });
  }

  getCode() {
    return this.invitationCode;
  }
}
