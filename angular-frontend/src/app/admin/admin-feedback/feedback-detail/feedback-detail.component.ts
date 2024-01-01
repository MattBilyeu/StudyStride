import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Feedback } from '../../../models/feedback.model';
import { DataService } from '../../../service/data.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpService } from '../../../service/http.service';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-feedback-detail',
  templateUrl: './feedback-detail.component.html',
  styleUrl: './feedback-detail.component.css'
})
export class FeedbackDetailComponent implements OnInit {
  @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() feedbackId: string;
  @Input() index: number;
  feedback: Feedback;
  sanitizedHTML: SafeHtml;
  viewEditor: boolean = false;
  editorConfig = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: "lists link table",
    toolbar: "numlist bullist link table"
  };

  constructor(private dataService: DataService,
              private domSanitizer: DomSanitizer,
              private http: HttpService) {}

  ngOnInit() {
    this.feedback = this.dataService.feedbacks.filter(feedback => feedback._id === this.feedbackId)[0];
    this.sanitizedHTML = this.domSanitizer.bypassSecurityTrustHtml(this.feedback.text)
  }

  emailSender(form: NgForm) {
    this.http.emailSender(form.value.message, this.feedback.userId).subscribe((response: Response) => {
      this.dataService.message.next(response.message);
      form.value.message = '';
      this.viewEditor = false
    })
  }

  displayEditor(){
    this.viewEditor = true;
  }

  deleteFeedback(){
    this.http.deleteFeedback(this.feedback._id).subscribe((response: Response) => {
      this.dataService.message.next(response.message);
      this.deleted.emit(true)
    })
  }
}
