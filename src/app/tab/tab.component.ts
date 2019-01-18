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

}
