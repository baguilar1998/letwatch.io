import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SafePipe } from './room/SafePipe';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JoinRoomComponent } from './join-room/join-room.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { RoomComponent } from './room/room.component';

import { RoomService } from './services/room.service';
import { CreateRoomFormComponent } from 'src/app/create-room/form/createRoom-form.component';
import { TabComponent } from './tab/tab.component';
import { VideoQueueComponent } from './tab/video-queue/video-queue.component';
import { ChatComponent } from './tab/chat/chat.component';
import { CurrentUsersComponent } from './tab/current-users/current-users.component';

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
    CurrentUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [RoomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
