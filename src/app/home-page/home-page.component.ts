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
  currentIcon: string;
  icons: string [];
  index: number;
  isValid: boolean;

  constructor(private userService: UserService,
  private loadingService: LoadingService) {
    this.componentState = 'createroom';
    this.icons = ['m1', 'f1', 'm2', 'f2', 'm3', 'f3', 'm4', 'f4'];
    this.index = 0;
    this.currentIcon = this.icons[this.index];
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
     *
    if (this.nickname === undefined || this.nickname === '') {
      this.isValid = false;
      return;
    } else {
      this.isValid = true;
    }*/

    /**
     * Creates/Updates User
     */
    if (!this.userService.isUserCreated) {
      this.userService.createUser(this.nickname, this.icons[this.index]);
      this.userService.isUserCreated = true;
    } else if (this.componentState ===  'home') {
      this.userService.updateUser(this.nickname, this.icons[this.index]);
    }

    // Changes the component state
    this.componentState = state;
  }


  previousIcon() {
    this.index--;
    if (this.index === -1) {
      this.index = 7;
    }
    this.currentIcon = this.icons[this.index];
  }


  nextIcon() {
    this.index++;
    if (this.index === 8) {
      this.index = 0;
    }
    this.currentIcon = this.icons[this.index];
  }

}
