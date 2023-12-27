import { AfterViewInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';

declare var tinymce: any;

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrl: './user-feedback.component.css'
})
export class UserFeedbackComponent implements AfterViewInit {
  editorConfig = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: "lists link table",
    toolbar: "numlist bullist link table"
  }

  ngAfterViewInit() {
    // tinymce.init({
    //   selector: '#editor',
    //   plugins: "lists link table",
    //   toolbar: "numlist bullist link table"
    // })
  }

  submitFeedback(form: NgForm) {

  }
}
