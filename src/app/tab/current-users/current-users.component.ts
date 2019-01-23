import { Component, OnInit } from '@angular/core';
import { User } from '../../tsmodels/user';
import { UserService } from '../../services/user.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-current-users',
  templateUrl: './current-users.component.html',
  styleUrls: ['./current-users.component.css']
})
export class CurrentUsersComponent implements OnInit {

  /**
   * Static test data
   */
  testUserList: User [] = [
    {
      _id: '',
      nickname: 'Brian',
      avatarColor: 'green',
      isHost: false
    },
    {
      _id: '',
      nickname: 'Mike',
      avatarColor: 'blue',
      isHost: false
    }
  ];

  currentUsers: User[];
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    // IMPLEMENT CODE TO DISPLAY USERS IN CURRENT ROOM
    // this.roomService.getUsers().subscribe((data) => {
      // console.log(data);
    // });
  }

}
