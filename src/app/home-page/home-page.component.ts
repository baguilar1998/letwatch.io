import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  componentState: string;
  colors: string [];
  index: number;
  styles;

  constructor() {
    this.componentState = 'home';
    this.colors = ['black', 'blue', 'red', 'yellow', 'green'];
    this.index = 0;
    this.styles = { color: this.colors[this.index] };
  }

  ngOnInit() {
  }

  changeState(state: string) {
    this.componentState = state;
  }

  previousColor() {
    this.index--;
    if (this.index === -1) {
      this.index = 4;
    }
    this.styles['color'] = this.colors[this.index];
  }

  nextColor() {
    this.index++;
    if (this.index === 5) {
      this.index = 0;
    }
    this.styles['color'] = this.colors[this.index];
  }

}
