import { Component, OnInit } from '@angular/core';
import { User } from '../../tsmodels/user';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.scss']
})
export class CurrentUsersComponent implements OnInit {

  currentUsers: User[];
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    // IMPLEMENT CODE TO DISPLAY USERS IN CURRENT ROOM
    this.roomService.getUsers().subscribe((data) => {
       this.currentUsers = data;
     });
  }

}
