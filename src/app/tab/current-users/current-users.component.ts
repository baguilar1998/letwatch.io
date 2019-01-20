import { Component, OnInit } from '@angular/core';
import { User } from '../../tsmodels/user';
import { UserService } from '../../services/user.service';

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
      nickname: 'Brian',
      avatarColor: 'green',
      isHost: false
    },
    {
      nickname: 'Mike',
      avatarColor: 'blue',
      isHost: false
    }
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {}

}