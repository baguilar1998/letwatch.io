import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.scss'],
})
export class VideoQueueComponent implements OnInit, OnChanges {

  //Toggles the list item to display additional buttons
  public isMouseInSearchItem: boolean = false;
  public listItemId: number  = -1;

  constructor(private playlistService: PlaylistService) {}


  ngOnInit() {}

  ngOnChanges() {
    /*this.playlistService.getPlaylist().subscribe((res) => {
     this.playlistService.currentPlaylist = res;
     console.log(res);
    });*/
  }



  removeVideo(video) {
    this.playlistService.removeVideo(video).subscribe((res) => {
      this.playlistService.currentPlaylist = res.videos;
      console.log(res);
    })
  }


  mouseEnterDisplayButtons(val: string, id: number){
    if(val == "enteringSearchItem"){
      this.listItemId = id;
    }
  }

  mouseLeaveHideButtons(val : string) {
    if(val == "leavingSearchItem"){
      this.listItemId = -1;
    }
  }




}
