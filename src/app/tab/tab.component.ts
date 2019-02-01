import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Video } from '../tsmodels/video';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../services/playlist.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {

  currentContent: string;

  // Defined on room.html file and sends the result to the room
  @Output() searchResult = new EventEmitter();

  // Grabs the videos from the api call in Room component
  // Sends to the search component
  @Input() videosFound;

  // These videos are added in a queue like fashion - FIFO
  videosForQueue = [];


  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.currentContent = 'users';

  }


  /**
   * Changes the tab content depending on what
   * button the user clicks
   * @param content tab-content that the user
   * wants to see
   */
  changeContent(content: string): void {
    this.currentContent = content;
  }


  // Defined on tab.component that takes the event from the search component
  // and sends it to this component which then fires another event
  // and sends this to the room component
  sendResultToRoom(event){
    this.searchResult.emit(event.search);
  }

  // Adds video to videoForQueue if currently not in
  videoToQueue(event) {

    const incomingVideo = event.video;
    console.log(incomingVideo);

    //Temporary fix for videos that render in and are channels
    if(incomingVideo.id.channelId) return;

    /* Check to see if the videosForQueue already contains the video by matching the id
    * Of the incoming video. If a result occurs, that means we already have it. Else we return
    * an empty array

    vid.videoId is the key associated to the video object down below
    incomingVideo.id.videoId is the key/value associated to Youtube's API
    */
    const temp = [] = this.videosForQueue.filter((vid) => (vid.videoId == incomingVideo.id.videoId));

    // If the temp size is 0 it means no video match the id, therefore add it
   if (temp.length === 0) {
      const video: Video = {
        title: incomingVideo.snippet.title,
        creator: incomingVideo.snippet.channelTitle,
        description: incomingVideo.snippet.description,
        videoId: incomingVideo.id.videoId,
        imageUrl: incomingVideo.snippet.thumbnails.default.url
      };
      this.playlistService.addVideo(video).subscribe(
        (res) => {

          this.videosForQueue.push(video);
        },
        (err) => {
          window.alert('Error adding in a video');
          console.log(err);
        });
    }
  }


  // Once user clicks on garbage can icon, updates the current videos
  removeVideoInQueue(vidToRemove){
    this.videosForQueue = this.videosForQueue.filter((vid) => vid.videoId != vidToRemove.id);
  }

}
