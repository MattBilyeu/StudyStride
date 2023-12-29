import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent {
  editorConfig = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: "lists link table",
    toolbar: "numlist bullist link table"
  };
  dangerousKeywords = [
    "import",
    "script",
    "onload",
    "onclick",
    "onerror",
    "script",
    "iframe",
    "object",
    "embed",
    "eval",
    "document.write",
    "setTimeout",
    "javascript:",
    "alert(",
    "confirm(",
    "SELECT",
    "DELETE",
    "UPDATE",
    "DROP",
    "../",
    "file://",
  ];

  constructor(private dataService: DataService,
              private http: HttpService) {}

  submitFeedback(form: NgForm) {
    const feedback = form.value.feedback;
    for (let i = 0; i < this.dangerousKeywords.length; i++) {
      if (feedback.lowerCase().includes(this.dangerousKeywords[i].toLowerCase())) {
        this.handleFeedback()
      } else {
        //Create feedback in server with HTTP service
        this.handleFeedback()
      }
    }
    form.value.feedback = ''
  }

  handleFeedback() {
    this.dataService.message.next('Thank you for your feedback');
    this.dataService.routerService.next(['user-dash']);
  }
}
