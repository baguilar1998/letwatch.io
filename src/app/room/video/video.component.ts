import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { PlaylistService } from '../../services/playlist.service';
import { Video } from '../../tsmodels/video';
import { Socket } from 'ngx-socket-io';

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
  private currentTime: string;
  private fullTime: string;
  private ytEvent: number;

  constructor(private loadingService: LoadingService,
  private playlistService: PlaylistService,
  private socket: Socket) {
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
    // Controls whether the video is playing or not
    this.socket.on('videoState', (videoState) => {
      this.isVideoPlaying = videoState;
      if (this.isVideoPlaying) {
        this.player.playVideo();
        this.updateVideoTime();
      } else {
        this.player.pauseVideo();
      }
    });
    // Controls the current duration of the video
    this.socket.on('currentDuration', (length) => {
      this.currentDuration = length;
    });
    // Moves on to the next video
    this.socket.on('nextVideo', (video) => {
      const currentPlayer = document.getElementById('videoPlayer');
      this.currentVideo = video;
      this.embeddedCode = video.videoId;
      this.playlistService.currentPlaylist.shift();
      this.player.cueVideoById(this.embeddedCode);
      this.videoDuration = this.player.getDuration();
      this.isLoading = false;
      currentPlayer.style.display = 'block';
    });
    // Controls when a new video is loading
    this.socket.on('videoLoading', (loading) => {
      const currentPlayer = document.getElementById('videoPlayer');
      this.isLoading = loading.state;
      currentPlayer.style.display = loading.style;
    });
    // Controls the seek value of the video
    this.socket.on('seekTo', (seekValue) => {
      this.player.seekTo(seekValue);
    });

    this.fullTime = '00:00';
    this.currentTime = '00:00';
  }

  ngOnDestroy() {
    this.playlistService.videoStatus.unsubscribe();
    this.socket.removeListener('videoState');
    this.socket.removeListener('currentDuration');
    this.socket.removeListener('nextVideo');
    this.socket.removeListener('seekTo');
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
    this.socket.emit('videoState', true);
    this.player.playVideo();
  }

  /**
   * Pauses the video player
   */
  public pauseVideo(): void {
    this.socket.emit('videoState', false);
    this.player.pauseVideo();
  }

  /**
   * Updates the video slider
   */
  public updateVideoTime() {
    this.fullTime = this.formatTime(this.player.getDuration());
    setInterval(() => {
      this.currentDuration = (this.player.getCurrentTime() / this.player.getDuration() * 100) ;
     // this.socket.emit('currentDuration', this.currentDuration);
      this.currentTime = this.formatTime(this.player.getCurrentTime());
      if (this.currentDuration === 100) {
        this.socket.emit('videoState', false);
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
    this.socket.emit('seekTo', updatedTime);
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
    this.socket.emit('videoLoading', {state: true, style: 'none'});
    setTimeout(() => {
      this.currentVideo = this.playlistService.currentPlaylist[0];
      this.playlistService.removeVideo(this.currentVideo).subscribe((results) => {
        this.socket.emit('nextVideo', this.currentVideo);
        this.socket.emit('videoLoading', {state: false, style: 'block'});
      },
      (err) => {
        console.log('an error has occured');
        this.socket.emit('videoLoading', {state: false, style: 'block'});
        console.log(err);
      });
    }, 2000);
  }

  public formatTime(time) {
    const currentTime = Math.round(time);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime - (minutes * 60);
    const stringSeconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + stringSeconds;
  }
}
