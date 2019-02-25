import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  messages: Subject<any>;

  constructor(private wsService: WebsocketService) { 
    this.messages = <Subject<any>>wsService
    .connect().pipe((res: any): any => {
      return res;
    })
    
    
    // .map((res: any): any => {
    //   return res;
    // })
    
  
  }


  sendMessage(msg){
    this.messages.next(msg);
  }
}
