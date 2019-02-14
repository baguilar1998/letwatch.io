import { Component, OnInit, OnChanges } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnChanges{

  embeddedCode: string;
  isVideoPlaying: boolean;
  private player;
  private ytEvent: YT.Player;

  constructor(private loadingService: LoadingService,
  private playlistService: PlaylistService) { }

  ngOnInit() {
    /*if (this.playlistService.currentPlaylist.length !== 0) {
      this.embeddedCode = this.playlistService.currentPlaylist[0].videoId;
    }*/
    this.embeddedCode = '8HL8VVjiOC8';
    this.isVideoPlaying = false;
  }

  ngOnChanges() {
    /*if (this.playlistService.currentPlaylist.length !== 0) {
      console.log('a change has been made');
    }*/
  }

  onStateChange(event): void {
    this.ytEvent = event.data;
  }

  public savePlayer(player): void {
    this.player = player;
    console.log(player);
    // console.log(player.getDuration());
  }

  public playVideo(): void {
    this.player.playVideo();
    this.isVideoPlaying = true;
  }

  public pauseVideo(): void {
    this.player.pauseVideo();
    this.isVideoPlaying = false;
  }

  public nextVideo(): void {
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
