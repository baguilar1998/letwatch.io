import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../node_modules/rxjs';
import { LoadingService } from '../services/loading.service';
import { debounceTime } from '../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {

  loading: boolean;
  loadingSubscription: Subscription;

  constructor(private loadingService: LoadingService) {
    this.loading = false;
   }

  ngOnInit() {
    this.loadingSubscription = this.loadingService.loadingStatus.pipe(
      debounceTime(200)
    )
    .subscribe((value) => {
        this.loading = value;
      });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }

}
