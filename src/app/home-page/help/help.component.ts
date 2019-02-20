import { Component, OnInit } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
}
