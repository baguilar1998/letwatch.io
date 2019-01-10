import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RoomComponent } from './room/room.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  // Temporary Route until further notice
  {
    path: 'room',
    component: RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {}
