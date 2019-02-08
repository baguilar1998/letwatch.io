import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private emailService: EmailService,
  private router: Router) { }

  ngOnInit() {
  }

  backToHome(): void {
    this.router.navigate(['/']);
  }
  send(): void {
    this.emailService.sendEmail().subscribe((res) => {

    }, (err) => {
      console.log(err);
    });
  }

}
