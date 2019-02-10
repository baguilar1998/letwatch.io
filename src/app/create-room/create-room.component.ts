import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Room} from './create-room-model';
import { RoomService } from '../services/room.service';
import { LoadingService } from '../services/loading.service';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {



  @Output() currentState = new EventEmitter<string>();
  invitationCode;

  // Injects roomservice to be able to send data to express
  constructor(private roomService: RoomService,
  private loadingService: LoadingService) {
  }

  /**
   * Generates a new code everytime the user clicks
   * on create a room
   */
  ngOnInit() {
    this.roomService.generateInvitationCode().subscribe((data) => {
      this.invitationCode = data.invitation;
    });
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
