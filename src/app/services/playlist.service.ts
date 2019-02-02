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
  constructor(private http: HttpClient,
  private roomService: RoomService) {
    this.getPlaylist();
   }

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

  /**
   * Gets the current state of the playlist in the current room
   * If there isn't any playlist available, the playlist will be
   * initialized as an empty array. Code is executed at the beginning of
   * the service
   */
  getPlaylist(): void {
    const requiredInfo = {
      roomId: this.roomService.getRoom()._id
    };
    this.http.post<any>('//localhost:3000/api/playlist/getVideos', requiredInfo).subscribe((res) => {
      // If there is a playlist available, set the current playlist to the playlist in the database
      if (res.booleanValue) {
        this.currentPlaylist = res.currentPlaylist.videos;
      } else {
        this.currentPlaylist = [];
      }
    });
  }
}
