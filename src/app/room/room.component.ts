import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { RoomService } from '../services/room.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {

  searchDataFromTab;

  // Key used to allows access to youtubes api
  private YOUTUBEKEY = 'AIzaSyAZORwaeof7pQ07NRVo3tEnejFQTuuwqGY';

  @Output() searchResult = new EventEmitter();

  // Passed as input to the tab component
  // Is sent to the search tab to display the matched results
  @Input()
  videosFound = [];


  constructor(private youtube: RoomService) {}

  /*
  After the component loads, use data service to pass data
  *from grandchild component (search-comp) to Room Comp
  *Room component will now have the result from the form that was submitted in search comp
  */
  ngOnInit() {

  }


  ngOnDestroy() {
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
