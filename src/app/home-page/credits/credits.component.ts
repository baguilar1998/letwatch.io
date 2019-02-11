import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Navigates back to the home component
   */
  backToHome(): void {
    this.router.navigate(['/']);
  }


}
