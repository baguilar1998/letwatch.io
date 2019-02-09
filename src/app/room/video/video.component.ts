import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  embeddedCode: string;
  isVideoPlaying: boolean;
  private player;
  private ytEvent: YT.Player;

  constructor(private loadingService: LoadingService,
  private playlistService: PlaylistService) { }

  ngOnInit() {
    this.embeddedCode = '8HL8VVjiOC8';
    this.isVideoPlaying = false;
  }

  onStateChange(event): void {
    this.ytEvent = event.data;
  }

  savePlayer(player): void {
    this.player = player;
    console.log(player);
    // console.log(player.getDuration());
  }

  playVideo(): void {
    this.player.playVideo();
    this.isVideoPlaying = true;
  }

  pauseVideo(): void {
    this.player.pauseVideo();
    this.isVideoPlaying = false;
  }

  nextVideo(): void {
    this.pauseVideo();
    const currentPlayer = document.getElementById('videoPlayer');
    currentPlayer.style.display = 'none';
    this.loadingService.startLoading();
    setTimeout(() => {
      this.embeddedCode = 'TYeul8ZaLrU';
      this.player.cueVideoById(this.embeddedCode);
      this.loadingService.stopLoading();
      currentPlayer.style.display = 'block';
    }, 2000);
  }

}
