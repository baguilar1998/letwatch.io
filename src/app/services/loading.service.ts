import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading: boolean;
  loadingStatus;

  constructor() {
    this.isLoading = false;
    this.loadingStatus = new Subject();
   }

   /**
    * @returns the current loading status
    */
   get loading(): boolean {
     return this.loading;
   }

   /**
    * @param value the current state of the
    * loading page
    */
   set loading (value: boolean) {
      this.isLoading = value;
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
     this.loading = false;
   }
}
