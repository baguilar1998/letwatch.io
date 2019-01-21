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

  constructor(private userService: UserService) { }

  ngOnInit() {}

}
