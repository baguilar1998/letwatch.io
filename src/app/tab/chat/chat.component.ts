import { Component, OnInit } from '@angular/core';
import { Message } from '../../tsmodels/message';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  /**
   * Static test data
   */
  messages: Message [] = [
    {
      user: {
        _id: '',
        nickname: 'Brian',
        iconName: 'm1',
        isHost: false
      },
      message: 'Hello there !'
    },
    {
      user: {
        _id: '',
        nickname: 'Mike',
        iconName: 'm2',
        isHost: false
      },
      message: 'What\'s up?'
    }
  ];

  constructor(private chat: ChatService) { }

  ngOnInit() {
    /*this.chat.messages.subscribe(msg => {
      console.log(msg);
    });*/
  }

  // Connected to ChatService
 /* sendMsg() {
    this.chat.sendMessage("It's working");
  }*/

  /**
   * Sends a message to the chat and displays it
   * in the chat component
   * @param response the message that the user
   * typed in
   */
  sendMessage(response): void {
    // When the user has no input, but clicks enter
    if (response.target.value === '') {
      return;
    }
    const newMessage: Message = {
     user: {
       _id: '',
        nickname: 'Brian',
        iconName: 'm1',
        isHost: false
      },
      message: response.target.value
    };
    this.messages.push(newMessage);
    (document.getElementById('user-message') as HTMLInputElement).value = '';
  }

}
