import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  embeddedCode: string;
  private player;
  private ytEvent: YT.Player;

  constructor() { }

  ngOnInit() {
    this.embeddedCode = '8HL8VVjiOC8';
  }

  savePlayer(player): void {
    this.player = player;
    console.log(player);
    // console.log(player.getDuration());
  }

  playVideo(): void {
    this.player.playVideo();
  }
}
