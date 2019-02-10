import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { Router } from '../../../../node_modules/@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private userMessage;
  constructor(private emailService: EmailService,
  private router: Router,
  private loadingService: LoadingService) { }

  ngOnInit() {
    this.userMessage = {
      email: '',
      name: '',
      message: '',
    };
  }

  /**
   * Navigates back to the home component
   */
  backToHome(): void {
    this.router.navigate(['/']);
  }

  /**
   * Sends the message to the backend and sends a no-reply email to
   * the user and an email to us to look at the user message
   */
  send(): void {
    this.loadingService.startLoading();
    setTimeout(() => {
      this.emailService.sendEmail(this.userMessage).subscribe((res) => {
        this.loadingService.stopLoading();
      }, (err) => {
        this.loadingService.stopLoading();
        console.log('email error');
      });
    }, 1000);
  }

}
