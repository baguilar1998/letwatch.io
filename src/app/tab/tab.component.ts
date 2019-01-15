import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  currentContent: string;
  constructor() { }

  ngOnInit() {
    this.currentContent = 'chat';
  }

  changeContent(content: string): void {
    this.currentContent = content;
  }

}
