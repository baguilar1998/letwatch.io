import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { RoomService } from '../services/room.service';
import { LoadingService } from '../services/loading.service';
import { Subject } from '../../../node_modules/rxjs';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  @Output() currentState = new EventEmitter<string>();
  invitationCode: string;
  notAvailable: boolean;
  availableSubject: Subject<boolean>;
  currentIcon: string;
  icons: string [];
  index: number;
  nickname: string;

  constructor(private userService: UserService,
    private roomService: RoomService,
    private socket: Socket,
    private router: Router,
    private loadingService: LoadingService) {
      this.notAvailable = false;
      this.icons = ['m1', 'f1', 'm2', 'f2', 'm3', 'f3', 'm4', 'f4'];
      this.nickname = '';
      this.index = 0;
      this.currentIcon = this.icons[this.index];
    }

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
    this.userService.createUser(this.nickname, this.icons[this.index]);
    this.loadingService.startLoading();
    setTimeout(() => {
      this.userService.addUser().subscribe(
        (user) => {
        // Add the user to the database
        console.log(user);
        if (user.hasOwnProperty('_id')) {
          this.userService.getCurrentUser()._id = user._id;
        }
        this.roomService.joinRoom(this.invitationCode).subscribe(
          (results) => {
            this.roomService.pushToRoom(this.userService.getCurrentUser(), results._id)
            .subscribe((pushedUser) => {
              console.log('Successful! Joining room');
              this.loadingService.stopLoading();
              this.loadingService.isHome = false;
              this.roomService.setRoom(results);
              this.socket.emit('joinRoom', this.userService.getCurrentUser());
              this.router.navigate(['/room', this.roomService.getRoom().invitationCode]);
            }
            , (finalError) => {
              console.log('User was not pushed into the room');
              console.log(finalError);
            });
          },
          (err) => {
            if (!err.error.isAvailable) {
              this.notAvailable = true;
              console.log('Room is full');
              console.log(this.notAvailable);
            } else {
              console.log('Room does not exist');
            }
            this.loadingService.stopLoading();
          }
        );
      },
      (error) =>  {
        console.log(error);
        window.alert('An error occured joining the room');
      });

    }, 1000);
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
