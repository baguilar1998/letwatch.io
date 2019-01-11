import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Room} from './create-room-model';
import { RoomService } from '../services/room.service';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  @Output() currentState = new EventEmitter<string>();
  roomKey;

  form = new Room(1, 1, '', '', '', 1);

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }


  constructor(private roomService: RoomService) {
  }

  /**
   * Generates a new code everytime the user clicks
   * on create a room
   */
  ngOnInit() {
    this.roomService.generateInvitationCode();
    this.roomKey = this.roomService.getCode();
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
