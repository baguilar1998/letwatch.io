import { Injectable } from '@angular/core';
import { Video } from '../tsmodels/video';
import { HttpClient, HttpErrorResponse} from '../../../node_modules/@angular/common/http';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { RoomService } from './room.service';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  headers: Headers;
  options: RequestOptions;

  currentPlaylist: Video [] = [];
  constructor(private http: HttpClient,
  private roomService: RoomService) {
    // this.getPlaylist();
   }


   public addCurrentPlaylist(video){
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
   const roomId = this.roomService.getRoom()._id
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
  getPlaylist(){
    const roomId = this.roomService.getRoom()._id;
    return this.http.get<any>(`//localhost:3000/api/playlist/getVideos/${roomId}`);
  };
}
