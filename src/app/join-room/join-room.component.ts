import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  @Output() currentState = new EventEmitter<string>();

  constructor(private router: Router) { }

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
    this.router.navigate(['/room']);
  }

}
