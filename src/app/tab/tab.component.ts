import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {

  currentContent: string;

  // Defined on room.html file and sends the result to the room
  @Output() searchResult = new EventEmitter();

  //Grabs the videos from the api call in Room component
  //Sends to the search component
  @Input() videosFound;

  videosForQueue = [];

  constructor() { 
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


  // Defined on tab.component that takes the event from the search
  // and sends it to this component which then fires another event
  // and sends this to the room component
  sendResultToRoom(event){
    this.searchResult.emit(event.search);
  }

  //Adds video to videoForQueue if currently not in
  videoToQueue(event){

    //Check to see if the videosForQueue already contains the video by matching the id
    let incomingVideo = event.video;
    let temp = [] = this.videosForQueue.filter((vid) => (vid.id.videoId == incomingVideo.id.videoId));
    
    //If the temp size is 0 it means no video match the id, therefore add it
    if(temp.length == 0){
      this.videosForQueue.push(incomingVideo);
    }
  }

}
