import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Room} from './create-room-model';
import { RoomService } from '../services/room.service';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {



  @Output() currentState = new EventEmitter<string>();
  roomKey;

  createRoomModel = new Room(1, 1, 'fsef', '',10,  '', 1);
  success =  ''
  error =  ''
  submitted =  false
  

  //Injects roomservice to be able to send data to express
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



  /*Connected to room service -> makes a call to createRoom 
  (/services/room.services) method in roomService submits 
  form data to express server */
  onSubmit() {
    this
      .roomService
      .createRoom(this.createRoomModel)
      .subscribe(
        data => {
          this.submitted = true
          this.success = data.response
        },
        error => this.error = error.statusText)
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
