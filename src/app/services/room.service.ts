import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { Room } from '../create-room/create-room-model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private invitationCode;
  private _createUrl = 'http://localhost:3000/api/room/create';

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

  // Post request to express server -> submits new form data for create room
  // attached to onSubmit method (create-room/create-room.component.ts)
  createRoom(room: Room){
    return this.http.post<any>(this._createUrl, room)
    .pipe(catchError(this.errorHandler));
  }

  // Sends error back to onSubmit
  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }
}
