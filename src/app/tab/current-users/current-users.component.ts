import { Component, OnInit } from '@angular/core';
import { User } from '../../tsmodels/user';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.scss'],
})
export class CurrentUsersComponent implements OnInit {

  currentUsers: User[];
  constructor(private roomService: RoomService,
  private userService: UserService,
  private socket: Socket) {}

  ngOnInit() {
    // Keeps track whenever users join rooms
    this.socket.on('joinRoom', (user) => {
      // this.currentUsers.push(user);
      this.roomService.getRoom().currentUsers.push(user);
      console.log(this.roomService.getRoom().currentUsers);
    });

    this.socket.on('leaveRoom', (user) => {
      console.log('A user has left the room');
      this.roomService.getRoom().currentUsers = this.roomService.getRoom().currentUsers.filter(
        u => u._id !== user._id
      );
      this.currentUsers = this.roomService.getRoom().currentUsers;
      console.log(this.currentUsers);
    });

    // Causes a problem!!
    this.roomService.getUsers().subscribe((data) => {
      console.log(data);
      this.currentUsers = data;
      this.roomService.getRoom().currentUsers = data;
     });
  }

}
