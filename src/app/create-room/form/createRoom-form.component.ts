import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Room} from '../create-room-model';
import {ValidateRoomName, ValidateRoomPassword} from './create-room-form.validators';
import {RoomService } from '../../services/room.service';

@Component({
    selector: 'app-createroom-form',
    templateUrl : './create-room-form.component.html',
    styleUrls : ['./create-room-form.component.css']
})

export class CreateRoomFormComponent implements OnInit {

    @Input('invitationCode') invitationCode: string;
    @Output() currentState = new EventEmitter<string>();
    success = '';
    error = '';
    submitted = false;

    constructor(private fb: FormBuilder,
      private _createRoomForm: RoomService, private router: Router) {}

    ngOnInit() {

    }

    // Uses reactive forms and groups all the form controllers into one
    // Custom form validation with ValidateCreateForm
    // First index is default data, 2nd is for validations
    createRoomForm = this.fb.group({
      id: ['1'],
      playlistId: ['1'],
      nickName: ['Displays previous user',],
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



// -------------------GETTERS------------------------- //

    // Used instead of createRoomForm.get('roomName')
    // Simply call roomName.property to gain access
    get roomName() {
        return this.createRoomForm.get('roomName');
    }

    get roomNameErrors() {
        return this.createRoomForm.get('roomName').errors;
    }



    // Uses object destructering to grab values
    // Same as saying this.createRoomForm
    onSubmit({value, valid}: {value: Room, valid: boolean}) {
      console.log(value);
        this._createRoomForm.createRoom(value)
        .subscribe(
            (res) => {
              console.log(res);
              this.success = res;
              // CALL TO THE BACKEND TO CREATE THE ROOM
              this.router.navigate(['/room']);
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
