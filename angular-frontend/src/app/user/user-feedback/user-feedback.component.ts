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
    toolbar: "numlist bullist link table",
    menubar: ""
  };

  constructor(private dataService: DataService,
              private http: HttpService) {}

  submitFeedback(form: NgForm) {
    this.http.createFeedback(form.value.feedback).subscribe();
    this.handleFeedback()
  }

  handleFeedback() {
    this.dataService.message.next('Thank you for your feedback');
    this.dataService.routerService.next(['user']);
  }
}
