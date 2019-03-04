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

  private roomData: Room;
  private YOUTUBEURL = 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyAZORwaeof7pQ07NRVo3tEnejFQTuuwqGY';


  constructor(private http: HttpClient, private userService: UserService) {
    this.roomData = null;
  }

  /**
   * @returns the current room
   */
  getRoom(): Room {
    return this.roomData;
  }

  /**
   * sets the current room that the user
   * is in
   * @param room the current room data
   */
  setRoom(room: Room): void {
    this.roomData = room;
  }
  /**
   * Generates an invitation code from
   * the backend
   */
  generateInvitationCode(): Observable<any> {
    return this.http.get<{invitation: any}>('//localhost:3000/api/room/invitation');
  }

  // Post request to express server -> submits new form data for create room
  // attached to onSubmit method (create-room/create-room.component.ts)
  createRoom(room: Room): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/room/create', room)
    .pipe(catchError(this.errorHandler));
  }

  /**
   * Allows the user to join an available room
   * @param key an invitation code
   */
  joinRoom(key: string): Observable<any> {
    return this.http.get<any>('//localhost:3000/api/room/' + key);
  }

  /**
   * User leaves the room and removes the user from
   * the room
   * @param user the user that is leaving the room
   */
  leaveRoom(currentUser: User): Observable<any> {
    const requiredInformation = {
      user: currentUser,
      roomId: this.roomData._id
    };
    return this.http.post<any>('//localhost:3000/api/room/leaveRoom', requiredInformation);
  }

  pushToRoom(currentUser: User, id: string ): Observable<any> {
    const requiredInformation = {
      user: currentUser,
      roomId: id
    };
    return this.http.post<any>('//localhost:3000/api/room/pushToRoom', requiredInformation);
  }

  getUsers(): Observable<any> {
    return this.http.post<{invitationCode: any}>('//localhost:3000/api/room/currentUsers', {invitationCode: this.roomData.invitationCode});
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
