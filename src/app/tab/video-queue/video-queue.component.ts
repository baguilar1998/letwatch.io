import { Component, OnInit, Input, Output, OnChanges, OnDestroy } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { EventEmitter } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.scss'],
})
export class VideoQueueComponent implements OnInit, OnChanges, OnDestroy {

  // Toggles the list item to display additional buttons
  public isMouseInSearchItem = false;
  public listItemId = -1;

  constructor(private playlistService: PlaylistService,
  private socket: Socket) {}


  ngOnInit() {
    this.socket.on('removeVideo', (playlist) => {
      this.playlistService.currentPlaylist = playlist;
    });
  }

  ngOnChanges() {
    /*this.playlistService.getPlaylist().subscribe((res) => {
     this.playlistService.currentPlaylist = res;
     console.log(res);
    });*/
  }

  ngOnDestroy() {
    this.socket.removeListener('removeVideo');
  }

  removeVideo(video) {
    this.playlistService.removeVideo(video).subscribe((res) => {
      this.playlistService.currentPlaylist = this.playlistService.currentPlaylist
      .filter(v => v !== video);
      if (this.playlistService.currentPlaylist.length === 0) {
        this.playlistService.videosInPlaylist = false;
      }
      this.socket.emit('removeVideo', this.playlistService.currentPlaylist);
    });
  }


  mouseEnterDisplayButtons(val: string, id: number) {
    if (val === 'enteringSearchItem') {
      this.listItemId = id;
    }
  }

  mouseLeaveHideButtons(val: string) {
    if (val === 'leavingSearchItem') {
      this.listItemId = -1;
    }
  }




}
