import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Room} from '../../tsmodels/room';
import {ValidateRoomName, ValidateRoomPassword} from './create-room-form.validators';
import {RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-createroom-form',
    templateUrl : './create-room-form.component.html',
    styleUrls : ['./create-room-form.component.css']
})

export class CreateRoomFormComponent implements OnInit {

    @Input('invitationCode') invitationCode: string;
    @Output() currentState = new EventEmitter<string>();
    numberOfUsers: number[];
    createRoomForm;
    success = '';
    error = '';
    submitted = false;

    constructor(private fb: FormBuilder,
      private userService: UserService,
      private _createRoomForm: RoomService,
      private router: Router) {}

    ngOnInit() {
      // Uses reactive forms and groups all the form controllers into one
      // Custom form validation with ValidateCreateForm
      // First index is default data, 2nd is for validations
      this.createRoomForm = this.fb.group({
        id: ['1'],
        playlistId: ['1'],
        nickName: ['Displays previous user'],
        roomName: ['test', [
                        Validators.minLength(3),
                        Validators.maxLength(15),
                        ValidateRoomName]],
        password: ['hellot', [
                        Validators.minLength(5),
                        Validators.maxLength(15),
                        ValidateRoomPassword]],
        confirmPassword: ['hellot'],
        userId: ['1']
       });
      this.numberOfUsers = [2, 3, 4, 5, 6, 7, 8];
    }


// -------------------GETTERS------------------------- //

    // Used instead of createRoomForm.get('roomName')
    // Simply call roomName.property to gain access
    get roomName() {
        return this.createRoomForm.get('roomName');
    }

    get roomNameErrors() {
        return this.createRoomForm.get('roomName').errors;
    }



    /* Uses object destructering to grab values
       Same as saying this.createRoomForm*/
      async onSubmit({value, valid}: {value: Room, valid: boolean}) {

        // If this is a new user, add them to the database
        if (this.userService.getCurrentUser()._id === '') {
            await this.userService.addUser();
            this.userService.getCurrentUser().isHost = true;
        }

        // Creating a room object to store in the database
        const newRoom: Room = {
          roomName: value.roomName,
          host: this.userService.getCurrentUser(),
          currentUsers: [],
          invitationCode: this.invitationCode,
          password: value.password,
          maxCapacity: 2
        };

        // Storing the room object in the database
        this._createRoomForm.createRoom(newRoom)
        .subscribe(
            (res) => {
              this.success = res;
              this._createRoomForm.setRoom(newRoom);
              this.router.navigate(['/room', this.invitationCode]);
            },
            (err) => {
              console.log(err);
              this.error = err;
            }
        );
    }

    /**
     * Displays the home page component and disables
     * the create a room component
     * @param state the next component to display
     */
    goBack(): void {
      this.currentState.next('home');
    }

}
