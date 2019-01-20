import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-video-queue',
  templateUrl: './video-queue.component.html',
  styleUrls: ['./video-queue.component.css'],
  inputs: ['videosForQueue']
})
export class VideoQueueComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
