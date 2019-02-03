import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit {

  @Output() currentState = new EventEmitter<string>();
  invitationCode: string;

  constructor(private userService: UserService,
    private roomService: RoomService,
    private router: Router,
    private loadingService: LoadingService ) { }

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
    this.loadingService.startLoading();
    setTimeout(() => {
      this.roomService.joinRoom(this.invitationCode).subscribe(
        (res) => {
          console.log('Successful! Joining room');
          this.loadingService.stopLoading();
          this.roomService.setRoom(res);
          this.userService.addUser();
          this.router.navigate(['/room', 'test']);
        },
        (err) => {
          console.log('Room does not exist');
          this.loadingService.stopLoading();
        }
      );
    }, 1000);
  }

}
