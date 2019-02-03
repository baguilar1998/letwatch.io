import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private emailService: EmailService) { }

  ngOnInit() {
  }

  send(): void {
    this.emailService.sendEmail().subscribe((res) => {

    }, (err) => {
      console.log(err);
    });
  }

}
