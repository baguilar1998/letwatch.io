import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.css'],
  inputs: ['videosForQueue']
})
export class VideoQueueComponent implements OnInit, OnChanges {

  @Input() videosForQueue = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.playlistService.getPlaylist();
  }

  ngOnChanges() {
    console.log(this.playlistService.currentPlaylist);
  }
}
