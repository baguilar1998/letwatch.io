import { Component, OnInit } from '@angular/core';
import {Room} from './create-room-model';
import { Output } from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {

  form = new Room(1,1,"", "", "",1);

  submitted = false;

  onSubmit(){
    this.submitted = true;
  }

  ngOnInit() {
  }

}
