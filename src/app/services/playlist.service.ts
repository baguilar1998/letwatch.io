import { Injectable } from '@angular/core';
import { Video } from '../tsmodels/video';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { RoomService } from './room.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  currentPlaylist: Video [];
  // NEED TO UPDATE A SUBJECT FOR THE UPDATING POSSIBLY
  constructor(private http: HttpClient,
  private roomService: RoomService) { }

  /**
   * Adds a video to the playlist and stores it
   * in the database
   * @param v the added video
   */
  addVideo(v: Video): Observable<any> {
    const requiredInfo = {
      video: v,
      roomId: this.roomService.getRoom()._id
    };
    return this.http.post<any>('//localhost:3000/api/playlist/addVideo', requiredInfo);
  }
}
