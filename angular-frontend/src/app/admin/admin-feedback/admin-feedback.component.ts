import { Component, OnInit } from '@angular/core';
import { Feedback } from '../../models/feedback.model';
import { DataService } from '../../service/data.service';
import { HttpService } from '../../service/http.service';

interface feedbackResponse {
  message?: string,
  feedbacks?: Feedback[]
}

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrl: './admin-feedback.component.css'
})
export class AdminFeedbackComponent implements OnInit{
  feedbacks: Feedback[];

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.initializeComponent()
  }

  initializeComponent() {
    this.http.getFeedback().subscribe((response: feedbackResponse) => {
      if (response.feedbacks) {
        this.feedbacks = response.feedbacks;
        this.dataService.feedbacks = response.feedbacks
      }
    })
  }
}
