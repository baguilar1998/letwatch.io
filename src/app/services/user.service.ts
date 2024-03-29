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
import { Observable } from '../../../node_modules/rxjs';

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
   * @param icon the user's avatar
   */
  createUser(name: string, icon: string): void {
    this.user = {
      _id: '',
      nickname: name,
      iconName: icon,
      isHost: false
    };
  }

  /**
   * Updates the user if they decide to make
   * any changes along the way
   * @param name the user's nickname
   * @param icon the user's avatar
   */
  updateUser(name: string, icon: string): void {
    this.user.nickname = name;
    this.user.iconName = icon;
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
  addUser(): Observable<any> {
    return this.http.post<any>('//localhost:3000/api/user', this.user);
  }

  /**
   * Removes the user from the database
   */
  removeUser(): Observable<any> {
    const id = {
      id: this.user._id
    };
    return this.http.post<any>('//localhost:3000/api/removeUser', id);
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
