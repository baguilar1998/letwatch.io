import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {



  //Output to push data from grandchild (search comp) to child (tab comp)
  //Placed on search component html to emit evvent 
  @Output() searchHandler = new EventEmitter<string>();


  //Receives the videos from tab component that matched search
  @Input() videosFound;

  //Once the videos are rendered on the search result
  //User can add that video to the queue
  @Output() addVideoToQueue = new EventEmitter();


  constructor() {

   }

  ngOnInit() {

  }


  /*
  Search component will handle the youtube API calls
  After every input in the search input
  The video suggestions will render in the search tab
  Contains Video thumbnail, title, description, add to queue

  Buttons such as add to queue will be added to place the video in the video queue tab
  If added, add button will change to remove from queue if the video is already in the queue
  */

}