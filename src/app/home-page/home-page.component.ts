import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  nickname: string;
  componentState: string;
  colors: string [];
  index: number;
  isValid: boolean;
  styles;

  constructor(private userService: UserService,
  private loadingService: LoadingService) {
    this.componentState = 'home';
    this.colors = ['black', 'blue', 'red', 'yellow', 'green', 'orange', 'purple'];
    this.index = 0;
    this.styles = { color: this.colors[this.index] };
    this.isValid = true;
  }

  ngOnInit() {}

  /**
   * Keeps track of what component that is currently
   * displaying
   * @param state the next component to display
   */
  changeState(state: string) {
    /**
     * Doesn't allow the user to bypass to
     * the next state without a nickname
     */
    if (this.nickname === undefined || this.nickname === '') {
      this.isValid = false;
      return;
    } else {
      this.isValid = true;
    }

    /**
     * Creates/Updates User
     */
    if (!this.userService.isUserCreated) {
      this.userService.createUser(this.nickname, this.colors[this.index]);
      this.userService.isUserCreated = true;
    } else if (this.componentState ===  'home') {
      this.userService.updateUser(this.nickname, this.colors[this.index]);
    }

    // Changes the component state
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
