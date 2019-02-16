import { Injectable } from '@angular/core';
import { Video } from '../tsmodels/video';
import { HttpClient, HttpErrorResponse} from '../../../node_modules/@angular/common/http';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { RoomService } from './room.service';
import { Observable, Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  headers: Headers;
  options: RequestOptions;
  videosInPlaylist: boolean;
  videoStatus = new Subject<boolean>();

  currentPlaylist: Video [] = [];
  constructor(private http: HttpClient,
  private roomService: RoomService) {
    // Comment out the getPlaylist function to have access to the room component
    this.getPlaylist().subscribe((res) => {
      this.currentPlaylist = res.currentPlaylist;
      if(!this.currentPlaylist) {
        this.currentPlaylist = [];
      }
      if (this.currentPlaylist.length === 0) {
        this.videosInPlaylist = false;
      } else {
         this.videosInPlaylist = true;
      }
      console.log(res);
     });
  }


   public addCurrentPlaylist(video) {
      this.currentPlaylist.push(video);
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
   * Deletes a video from the queue and from the database
   * @param v the video that the user wants to remove
   * from the queue
   */
  removeVideo(v: Video): Observable<any> {
   const roomId = this.roomService.getRoom()._id;
   const requiredInfo = {
      video: v,
      roomId: roomId,
    };

    return this.http.put<any>(`//localhost:3000/api/playlist/removeVideo`, requiredInfo);
  }
  /**
   * Gets the current state of the playlist in the current room
   * If there isn't any playlist available, the playlist will be
   * initialized as an empty array. Code is executed at the beginning of
   * the service
   */
  getPlaylist() {
    const roomId = this.roomService.getRoom()._id;
    return this.http.get<any>(`//localhost:3000/api/playlist/getVideos/` + roomId);
  }
}
