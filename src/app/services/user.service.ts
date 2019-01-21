/**
 * A service that will keep track of the
 * current user that is on the website.
 * All user data will be stored in the user
 * service.
 * @author Brian and Mike
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '../../../node_modules/@angular/common/http';
import { User } from '../tsmodels/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: User;
  isUserCreated: boolean;

  constructor(private http: HttpClient) {
    this.isUserCreated = false;
   }

  /**
   * Creates a new user as the user goes through
   * the landing-page
   * @param name the user's nickname
   * @param color the user's avatar color
   */
  createUser(name: string, color: string): void {
    this.user = {
      _id: '',
      nickname: name,
      avatarColor: color,
      isHost: false
    };
  }

  /**
   * Updates the user if they decide to make
   * any changes along the way
   * @param name the user's nickname
   * @param color the user's avatar color
   */
  updateUser(name: string, color: string): void {
    this.user.nickname = name;
    this.user.avatarColor = color;
  }

  /**
   * @returns the current user
   */
  getCurrentUser(): User {
    return this.user;
  }


  /**
   * Stores the user inside the database
   * once they create or enter a room
   */
  addUser(): void {
    this.http.post<any>('//localhost:3000/api/user', this.user).subscribe((res) => {
      // console.log(res);
      this.user._id = res._id;
      console.log(this.user);
    });
  }

  /**
   * Debugging Function for database
   */
  getAllUsers(): void {
    this.http.get('//localhost:3000/api/users').subscribe( (data) => {
      console.log(data);
    });
  }

}
