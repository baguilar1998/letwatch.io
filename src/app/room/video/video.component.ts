import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { PlaylistService } from '../../services/playlist.service';
import { Video } from '../../tsmodels/video';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit, OnDestroy {

  private embeddedCode: string;
  private isVideoPlaying: boolean;
  private isLoading: boolean;
  private player;
  private videoDuration: number;
  private currentDuration: number;
  private currentVideo: Video;
  private ytEvent: number;

  constructor(private loadingService: LoadingService,
  private playlistService: PlaylistService) {
    /*this.playlistService.videoStatus.subscribe((data) => {
      this.playlistService.videosInPlaylist = data ;
      this.nextVideo();
    });*/
    this.embeddedCode = '8HWjjiRsFWg';
    this.currentVideo = {
      title: '',
      creator: '',
      description: '',
      videoId: '',
      imageUrl: ''
    };
    this.isLoading = false;
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
    // console.log(this.ytEvent);
  }

  /**
   * Sets up the video player
   * @param player the video player
   */
  public savePlayer(player): void {
    this.player = player;
    console.log(player);
    this.videoDuration = player.getDuration();
    this.currentDuration = (player.getCurrentTime() / player.getDuration()) * 100;
  }

  /**
   * Starts the video player, if a video
   * is loaded
   */
  public playVideo(): void {
    this.player.playVideo();
    this.player.hideVideoInfo();
    this.isVideoPlaying = true;
    this.updateVideoTime();
  }

  /**
   * Pauses the video player
   */
  public pauseVideo(): void {
    this.player.pauseVideo();
    this.isVideoPlaying = false;
  }

  public updateVideoTime() {
    setInterval(() => {
      this.currentDuration = (this.player.getCurrentTime() / this.player.getDuration()) * 100;
      if (this.currentDuration === 100) {
        this.pauseVideo();
        return;
      }
    }, 1000);
  }

  /**
   * Seeks the video to corresponding time on the slider
   * @param event the value that the user seeked to
   * on the slider element
   */
  public seekTo(event): void {
    const updatedTime = this.videoDuration * (event.target.value / 100);
    this.player.seekTo(updatedTime);
    if (!this.isVideoPlaying) {
      this.pauseVideo();
    }
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
    this.isLoading = true;
    setTimeout(() => {
      this.currentVideo = this.playlistService.currentPlaylist[0];
      this.playlistService.removeVideo(this.currentVideo).subscribe((results) => {
        this.embeddedCode = this.currentVideo.videoId;
        this.playlistService.currentPlaylist.shift();
        this.player.cueVideoById(this.embeddedCode);
        this.videoDuration = this.player.getDuration();
        this.isLoading = false;
        currentPlayer.style.display = 'block';
      },
      (err) => {
        console.log('an error has occured');
        this.isLoading = false;
        currentPlayer.style.display = 'block';
        console.log(err);
      });
    }, 2000);
  }

}
