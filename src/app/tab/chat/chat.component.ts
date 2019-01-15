import { Component, OnInit } from '@angular/core';
import { Message } from '../../tsmodels/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  /**
   * Static test data
   */
  messages: Message [] = [
    {
      user: {
        nickname: 'Brian',
        avatarColor: 'green',
        isHost: false
      },
      message: 'Hello there !'
    },
    {
      user: {
        nickname: 'Mike',
        avatarColor: 'blue',
        isHost: false
      },
      message: 'What\'s up?'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  /**
   * Sends a message to the chat and displays it
   * in the chat component
   * @param response the message that the user
   * typed in
   */
  sendMessage(response): void {
    const newMessage: Message = {
     user: {
        nickname: 'Brian',
        avatarColor: 'green',
        isHost: false
      },
      message: response.target.value
    };
    this.messages.push(newMessage);
    (document.getElementById('user-message') as HTMLInputElement).value = '';
  }

}
