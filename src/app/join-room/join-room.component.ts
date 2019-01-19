import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  @Output() currentState = new EventEmitter<string>();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  /**
   * Displays the home page component and disables
   * the create a room component
   * @param state the next component to display
   */
  goBack(state: string): void {
    this.currentState.emit(state);
  }

  /**
   * Allows the user to go into
   * an available room
   */
  join(): void {
    try {
      this.userService.addUser();
      this.router.navigate(['/room']);
    } catch (err) {
      console.log('An error has occured');
    }
  }

}
