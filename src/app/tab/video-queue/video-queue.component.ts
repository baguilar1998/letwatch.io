import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.css'],
  inputs: ['videosForQueue']
})
export class VideoQueueComponent implements OnInit, OnChanges {


  @Input() videosForQueue;


  constructor() {
    console.log(this.videosForQueue);
   }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log(this.videosForQueue);
  }
}
