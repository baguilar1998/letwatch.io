import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoomComponent } from './room/room.component';
import { LoadingComponent } from './loading/loading.component';
import { ContactComponent } from './home-page/contact/contact.component';
import { HelpComponent } from './home-page/help/help.component';
import { CreditsComponent } from './home-page/credits/credits.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'room/:id',
    component: RoomComponent
  },
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
  {
    path: 'credits',
    component: CreditsComponent
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
