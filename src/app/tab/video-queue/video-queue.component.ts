import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.scss'],
})
export class VideoQueueComponent implements OnInit, OnChanges {

  @Input() videosForQueue = [];


  //Toggles the list item to display additional buttons
  public isMouseInSearchItem: boolean = false;
  public listItemId: number  = -1;

  constructor(private playlistService: PlaylistService) {}


  ngOnInit() {
    // this.playlistService.getPlaylist();
  }

  ngOnChanges() {
    // this.playlistService.getPlaylist();
  }


  // removes video from the playlist
  // needs to dynamically change
  removeVideo(video){
    this.playlistService.removeVideo(video).subscribe((res) => {
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
