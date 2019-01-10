import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  currentVideo: string;
  embeddedCode: string;

  constructor() {
    this.embeddedCode = '8HL8VVjiOC8';
    this.changeVideo();
  }

  ngOnInit() {
  }

  next(): void {
    this.embeddedCode = 'TYeul8ZaLrU';
    this.changeVideo();
  }

  changeVideo(): void {
    this.currentVideo = 'https://www.youtube.com/embed/' + this.embeddedCode + '?autoplay=1';
  }
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
