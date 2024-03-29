import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {Room} from '../../tsmodels/room';
import {ValidateRoomName, ValidateRoomPassword} from './create-room-form.validators';
import {RoomService } from '../../services/room.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
    selector: 'app-createroom-form',
    templateUrl : './create-room-form.component.html',
    styleUrls : ['./create-room-form.component.scss']
})

export class CreateRoomFormComponent implements OnInit {

    @Input('invitationCode') invitationCode: string;
    @Output() currentState = new EventEmitter<string>();
    numberOfUsers: number[];
    createRoomForm;
    success = '';
    error = '';
    submitted = false;
    currentIcon: string;
    icons: string [];
    index: number;

    constructor(private fb: FormBuilder,
      private userService: UserService,
      private loadingService: LoadingService,
      private _createRoomForm: RoomService,
      private router: Router) {}

    ngOnInit() {
      this.icons = ['m1', 'f1', 'm2', 'f2', 'm3', 'f3', 'm4', 'f4'];
      this.index = 0;
      this.currentIcon = this.icons[this.index];
      // Uses reactive forms and groups all the form controllers into one
      // Custom form validation with ValidateCreateForm
      // First index is default data, 2nd is for validations
      this.createRoomForm = this.fb.group({
        id: ['1'],
        playlistId: ['1'],
        nickname: '',
        roomName: ['', [
                        Validators.minLength(3),
                        Validators.maxLength(15),
                        ValidateRoomName]],
        password: ['', [
                        Validators.minLength(5),
                        Validators.maxLength(15),
                        ValidateRoomPassword]],
        confirmPassword: [''],
        userId: ['1'],
        maxUsers: ['2']
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
      onSubmit({value, valid}: {value, valid: boolean}) {
        console.log(valid);
        this.userService.createUser(value.nickname, this.icons[this.index]);
        this.loadingService.startLoading();
        setTimeout(() => {
            this.userService.getCurrentUser().isHost = true;
            this.userService.addUser().subscribe((res) => {
              if (res.hasOwnProperty('_id')) {
                this.userService.getCurrentUser()._id = res._id;
              }
              // Creating a room object to store in the database
              const newRoom: Room = {
                _id: '',
                host: this.userService.getCurrentUser(),
                currentUsers: [],
                invitationCode: this.invitationCode,
                maxCapacity: value.maxUsers
              };

              this._createRoomForm.setRoom(newRoom);

              // Storing the room object in the database
              this._createRoomForm.createRoom(newRoom)
              .subscribe(
                  (results) => {
                    this.loadingService.stopLoading();
                    this.loadingService.isHome = false;
                    this.success = res;
                    this._createRoomForm.getRoom()._id = results._id;
                    this.router.navigate(['/room', this.invitationCode]);
                  },
                  (error) => {
                    console.log(error);
                    this.error = error;
                    this.loadingService.stopLoading();
                  }
              );
            });
        }, 1000);

    }

    /**
     * Displays the home page component and disables
     * the create a room component
     * @param state the next component to display
     */
    goBack(): void {
      this.currentState.next('home');
    }


    previousIcon() {
      this.index--;
      if (this.index === -1) {
        this.index = 7;
      }
      this.currentIcon = this.icons[this.index];
    }


    nextIcon() {
      this.index++;
      if (this.index === 8) {
        this.index = 0;
      }
      this.currentIcon = this.icons[this.index];
    }

}
