import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { PlaylistService } from '../../services/playlist.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  embeddedCode: string;
  isVideoPlaying: boolean;
  private player;
  private ytEvent: YT.Player;

  constructor(private loadingService: LoadingService,
  private playlistService: PlaylistService) {
    /*this.playlistService.videoStatus.subscribe((data) => {
      this.playlistService.videosInPlaylist = data ;
      this.nextVideo();
    });*/
  }

  ngOnInit() {
    this.isVideoPlaying = false;
  }

  ngOnDestroy() {
    this.playlistService.videoStatus.unsubscribe();
  }

  /**
   * A function that gives us the current state of
   * the video player. Gives an integer value
   */
  onStateChange(event): void {
    this.ytEvent = event.data;
  }

  public savePlayer(player): void {
    this.player = player;
    console.log(player);
    // console.log(player.getDuration());
  }

  /**
   * Starts the video player, if a video
   * is loaded
   */
  public playVideo(): void {
    this.player.playVideo();
    this.isVideoPlaying = true;
  }

  /**
   * Pauses the video player
   */
  public pauseVideo(): void {
    this.player.pauseVideo();
    this.isVideoPlaying = false;
  }

  /**
   * Moves on the next video in the playist if there
   * is any
   */
  public nextVideo(): void {
    // If there are no more videos in the playlist
    if (this.playlistService.currentPlaylist.length === 0) {
      if (this.isVideoPlaying) {
        this.pauseVideo();
      }
      this.playlistService.videosInPlaylist = false;
      return;
    } else {
      this.playlistService.videosInPlaylist = true;
    }
    // If there are videos still in the playlist
    if (this.isVideoPlaying) {
      this.pauseVideo();
    }
    const currentPlayer = document.getElementById('videoPlayer');
    currentPlayer.style.display = 'none';
    this.loadingService.startLoading();
    setTimeout(() => {
      const video = this.playlistService.currentPlaylist[0];
      this.playlistService.removeVideo(video).subscribe((results) => {
        this.embeddedCode = this.playlistService.currentPlaylist[0].videoId;
        this.playlistService.currentPlaylist.shift();
        this.player.cueVideoById(this.embeddedCode);
        this.loadingService.stopLoading();
        currentPlayer.style.display = 'block';
      },
      (err) => {
        console.log('an error has occured');
        this.loadingService.stopLoading();
        currentPlayer.style.display = 'block';
        console.log(err);
      });
    }, 2000);
  }

}
