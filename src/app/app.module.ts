import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SafePipe } from './room/SafePipe';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { CreateRoomFormComponent } from 'src/app/create-room/form/createRoom-form.component';
import { TabComponent } from './tab/tab.component';
import { VideoQueueComponent } from './tab/video-queue/video-queue.component';
import { ChatComponent } from './tab/chat/chat.component';
import { CurrentUsersComponent } from './tab/current-users/current-users.component';
import { RoomComponent } from './room/room.component';

import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';
import { LoadingService } from './services/loading.service';
import { SearchComponent } from './tab/search/search.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';


import { ContactComponent } from './home-page/contact/contact.component';
import { HelpComponent } from './home-page/help/help.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    JoinRoomComponent,
    CreateRoomComponent,
    CreateRoomFormComponent,
    RoomComponent,
    SafePipe,
    TabComponent,
    VideoQueueComponent,
    ChatComponent,
    CurrentUsersComponent,
    SearchComponent,
    NotFoundComponent,
    LoadingComponent,
    ContactComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    RoomService,
    UserService,
    LoadingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
