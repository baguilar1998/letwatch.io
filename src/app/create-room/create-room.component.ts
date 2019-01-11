import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Room} from './create-room-model';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  @Output() currentState = new EventEmitter<string>();

  form = new Room(1, 1, '', '', '', 1);

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  ngOnInit() {
  }

  /**
   * Displays the home page component and disables
   * the create a room component
   * @param state the next component to display
   */
  goBack(state: string): void {
    this.currentState.emit(state);
  }

}
