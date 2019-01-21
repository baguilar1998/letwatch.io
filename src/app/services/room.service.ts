import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { User } from '../tsmodels/user';
import { Room } from '../tsmodels/room';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private currentInvitationCode;
  private currentUsers: User[];
  private _createUrl = '//localhost:3000/api/room/create';

  private YOUTUBEURL = "https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAZORwaeof7pQ07NRVo3tEnejFQTuuwqGY";


  constructor(private http: HttpClient, private userService: UserService) { }

  /**
   * Generates an invitation code from
   * the backend
   */
  generateInvitationCode(): Observable<any> {
    return this.http.get<{invitation: any}>('//localhost:3000/api/room/invitation');
  }

  // Post request to express server -> submits new form data for create room
  // attached to onSubmit method (create-room/create-room.component.ts)
  createRoom(room: Room) {
    return this.http.post<any>(this._createUrl, room)
    .pipe(catchError(this.errorHandler));
  }

  joinRoom(key: string): Observable<any> {
    return this.http.get<any>('//localhost:3000/api/room/' + key);
  }

  // Sends error back to onSubmit
  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }


  // CALLS YOUTUBE API
  // Can dynamically pass in the data coming in
  getYoutubeVideos(data) {
    const youtubeSearchUrl = 'https://www.googleapis.com/youtube/v3/search?q=$' + data
    + '&key=AIzaSyAZORwaeof7pQ07NRVo3tEnejFQTuuwqGY&part=snippet&maxResults=50';
    return this.http.get<any>(youtubeSearchUrl);
  }
}
