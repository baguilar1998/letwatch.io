import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomComponent } from './room/room.component';
import { LoadingComponent } from './loading/loading.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  // Temporary Route until further notice
  {
    path: 'room/:id',
    component: RoomComponent
  },
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
  providers: [],
})

export class AppRoutingModule {}
