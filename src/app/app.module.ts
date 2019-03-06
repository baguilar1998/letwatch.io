/**
 * CONSTANTS
 */
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

 /**
  * MODULES
  */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { YoutubePlayerModule } from 'ngx-youtube-player';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SafePipe } from './room/SafePipe';

/**
 * COMPONENTS
 */
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { CreateRoomFormComponent } from 'src/app/create-room/form/createRoom-form.component';
/*import { TabComponent } from './tab/tab.component';
import { VideoQueueComponent } from './tab/video-queue/video-queue.component';
import { ChatComponent } from './tab/chat/chat.component';
import { CurrentUsersComponent } from './tab/current-users/current-users.component';
import { RoomComponent } from './room/room.component';*/

import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';
import { SearchComponent } from './tab/search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';


import { ContactComponent } from './home-page/contact/contact.component';
import { HelpComponent } from './home-page/help/help.component';
import { CreditsComponent } from './home-page/credits/credits.component';
// import { VideoComponent } from './room/video/video.component';
import { ChatService } from './services/chat.service';
import { WebsocketService } from './services/websocket.service';
import { TermsConditionsComponent } from './home-page/terms-conditions/terms-conditions.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    JoinRoomComponent,
    CreateRoomComponent,
    CreateRoomFormComponent,
    SafePipe,
    NotFoundComponent,
    LoadingComponent,
    ContactComponent,
    HelpComponent,
    CreditsComponent,
    TermsConditionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    RoomService,
    UserService,
    LoadingService,
    ChatService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
