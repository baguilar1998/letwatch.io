import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  nickname: string;
  componentState: string;
  colors: string [];
  index: number;
  styles;

  constructor() {
    this.componentState = 'home';
    this.colors = ['black', 'blue', 'red', 'yellow', 'green', 'orange', 'purple'];
    this.index = 0;
    this.styles = { color: this.colors[this.index] };
  }

  ngOnInit() {}

  /**
   * Keeps track of what component that is currently
   * displaying
   * @param state the next component to display
   */
  changeState(state: string) {
    this.componentState = state;
  }

  /**
   * Changes the avatar's color to its previous color
   */
  previousColor() {
    this.index--;
    if (this.index === -1) {
      this.index = 6;
    }
    this.styles['color'] = this.colors[this.index];
  }

  /**
   * Changes the avatar's color to the next available color
   */
  nextColor() {
    this.index++;
    if (this.index === 7) {
      this.index = 0;
    }
    this.styles['color'] = this.colors[this.index];
  }

}
