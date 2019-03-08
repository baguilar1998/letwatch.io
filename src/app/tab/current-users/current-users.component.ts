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
      this.currentUsers.push(user);
      this.roomService.getRoom().currentUsers.push(user);
      console.log(this.roomService.getRoom().currentUsers);
    });

    this.socket.on('disconnect', (user) => {
      console.log('A user has left the room');
    });

    this.roomService.getUsers().subscribe((data) => {
      console.log(data);
      if (data.length === 1 && this.userService.getCurrentUser().isHost) {
        this.roomService.getRoom().currentUsers.push(this.userService.getCurrentUser());
      }
      this.currentUsers = data;
     });
    /* this.currentUsers = [
       {
        _id: '',
        nickname: 'test1',
        iconName: 'm3',
        isHost: true
       },
       {
        _id: '',
        nickname: 'test2',
        iconName: 'f3',
        isHost: false
       },
       {
        _id: '',
        nickname: 'test3',
        iconName: 'm2',
        isHost: false
       },
       {
        _id: '',
        nickname: 'test1',
        iconName: 'f1',
        isHost: false
       }
     ];*/
  }

}
