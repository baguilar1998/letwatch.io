import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Socket } from 'ngx-socket-io';


// import environments to have access to socket key
// import environment from '/path/to/env/folder'

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  testId = this.socket.fromEvent<any>('test');
  // connects to our socket io server
  // private socket;

  constructor(private socket: Socket) { }

  /*connect(): Subject<MessageEvent> {

    //Define the varaible in a separate environment file

this.socket = io('http://localhost:3000');

    //every time the socket receives a message,
    //we pass the data
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        console.log("message received");
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data: Object) => {
        this.socket.emit('message', JSON.stringify(data));
      }
    }

    return Subject.create(observer,observable);
  }*/
}
