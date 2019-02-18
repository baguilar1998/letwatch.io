import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RoomService } from './services/room.service';
@Injectable()

export class AuthGuard implements CanActivate {

  constructor(private roomService: RoomService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  boolean | Observable<boolean> | Promise <boolean> {
    const hasRoomId = this.roomService.getRoom() !== null;
    if (!hasRoomId) {
      this.router.navigate(['/']);
    }
    return hasRoomId;
  }
}
