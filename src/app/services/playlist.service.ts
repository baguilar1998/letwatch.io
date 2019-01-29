import { Injectable } from '@angular/core';
import { Video } from '../tsmodels/video';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { RoomService } from './room.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  currentPlaylist: Video [];
  constructor(private http: HttpClient,
  private roomService: RoomService) { }

  /**
   * Adds a video to the playlist and stores it
   * in the database
   * @param v the added video
   */
  addVideo(v: Video) {
    const requiredInfo = {
      video: v,
      // CHANGE TO ROOM ID LATER ON
      roomId: this.roomService.getRoom().invitationCode
    };
    this.http.post<any>('//localhost:3000/api/playlist/addVideo', requiredInfo);
  }
}
