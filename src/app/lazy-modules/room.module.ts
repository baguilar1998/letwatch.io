import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomComponent } from '../room/room.component';
import { VideoComponent } from '../room/video/video.component';
import { TabComponent } from '../tab/tab.component';
import { VideoQueueComponent } from '../tab/video-queue/video-queue.component';
import { ChatComponent } from '../tab/chat/chat.component';
import { CurrentUsersComponent } from '../tab/current-users/current-users.component';
import { SearchComponent } from '../tab/search/search.component';
import { YoutubePlayerModule } from 'ngx-youtube-player';

import { Routes, RouterModule, Router } from '@angular/router';

const routes: Routes = [
  {path: '', component: RoomComponent}
];

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    RoomComponent,
    VideoComponent,
    TabComponent,
    VideoQueueComponent,
    SearchComponent,
    ChatComponent,
    CurrentUsersComponent
  ],
  exports: [RouterModule]
})
export class RoomModule { }
