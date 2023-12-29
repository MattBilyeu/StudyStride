import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.css'
})
export class AdminFeedbackComponent {
  feedbacks: string[]; //Change to feedback objects once I create the models.

}
