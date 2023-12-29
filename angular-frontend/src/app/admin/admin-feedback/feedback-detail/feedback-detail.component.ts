import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrl: './feedback-detail.component.css'
})
export class FeedbackDetailComponent implements OnInit {
  @Input() feedbackId: string;
  feedback: string;
  // @Input() index: number;
  index: number = 1;
  viewEditor: boolean = false;
  editorConfig = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: "lists link table",
    toolbar: "numlist bullist link table"
  };

  ngOnInit() {
    //Use feedbackId to find the feedback and assign it.
  }

  emailSender(form: NgForm) {

  }

  displayEditor(){
    this.viewEditor = true;
  }

  deleteFeedback(){
    
  }
}
