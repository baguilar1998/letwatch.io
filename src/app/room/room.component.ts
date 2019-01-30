import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, OnDestroy {

  currentVideo: string;
  embeddedCode: string;

  searchDataFromTab;

  // Key used to allows access to youtubes api
  private YOUTUBEKEY = "AIzaSyAZORwaeof7pQ07NRVo3tEnejFQTuuwqGY";

  @Output() searchResult = new EventEmitter();

  // Passed as input to the tab component
  // Is sent to the search tab to display the matched results
  @Input()
  videosFound = [];


  constructor(private youtube: RoomService) {
    this.embeddedCode = '8HL8VVjiOC8';
    this.changeVideo();
  }

  /*
  After the component loads, use data service to pass data
  *from grandchild component (search-comp) to Room Comp
  *Room component will now have the result from the form that was submitted in search comp
  */
  ngOnInit() {

  }


  ngOnDestroy() {
  }
  /**
   * Moves to the next video if the minimum
   * number of votes has been meet
   */
  next(): void {
    this.embeddedCode = 'TYeul8ZaLrU';
    this.changeVideo();
  }

  /**
   * Helper function to set the new video
   * to the video player
   */
  changeVideo(): void {
    this.currentVideo = 'https://www.youtube.com/embed/' + this.embeddedCode + '?autoplay=1';
  }

  // Method on room.html -> gets fired once the tab component receives data from the search component
  // Receives back the youtube result to display the video on the room
  getSearchResult(data) {
    console.log(data);
    this.youtube.getYoutubeVideos(data).subscribe((result) => {
      this.videosFound = result.items;
      // console.log(this.videosFound);
    });

  }

  // Sample method to grab youtubeAPI result and send back to  Tab -> Search
  // findVideo(result){
  //   return this.videos.filter((vid) => vid.title.match(result));
  // }




}

// Code to be used later to get the embedded code

// function getId(url) {
  // var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  // var match = url.match(regExp);

  // if (match && match[2].length == 11) {
    //  return match[2];
  // } else {
    //  return 'error';
  // }
// }

// var videoId = getId('http://www.youtube.com/watch?v=zbYf5_S7oJo');

// var iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/'
 // + videoId + '" frameborder="0" allowfullscreen></iframe>';
