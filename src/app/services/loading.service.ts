import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading: boolean;
  loadingStatus: Subject<any>;

  constructor() {
    this.isLoading = false;
    this.loadingStatus = new Subject();
   }

   /**
    * Starts the load the page
    */
   startLoading(): void {
     this.isLoading = true;
   }

   /**
    * Stops loading the page
    */
   stopLoading(): void {
     this.isLoading = false;
   }
}
