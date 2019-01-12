import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Room} from '../create-room-model';
import {ValidateRoomName, ValidateRoomPassword} from './create-room-form.validators';
import {RoomService } from '../../services/room.service';

@Component({
    selector: 'createRoom-form',
    templateUrl : './create-room-form.component.html',
    styleUrls : ['./create-room-form.component.css']
})

export class CreateRoomFormComponent implements OnInit {

    success = '';
    error = '';
    submitted = false;

    constructor(private fb: FormBuilder,
      private _createRoomForm: RoomService,private router: Router) {}

    ngOnInit() {

    }

    // Uses reactive forms and groups all the form controllers into one
    // Custom form validation with ValidateCreateForm
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
        this._createRoomForm.createRoom(value)
        .subscribe(
            (res) => {
              this.success = res;
              this.router.navigate(['/room']);
            },
            (err) => {
              this.error = err;
            }
        );
    }
}
