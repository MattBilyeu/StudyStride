import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { HttpService } from '../../service/http.service';
import { Response } from '../../models/response.model';

interface Timestamp {
  stamp: Date;
  duration: Number
}

interface TopicObj {
  topic: string;
  timestamps: Timestamp[];
}

@Component({
  selector: 'app-topic-stats',
  templateUrl: './topic-stats.component.html',
  styleUrls: ['./topic-stats.component.css']
})
export class TopicStatsComponent implements OnInit {
  topicObjs: TopicObj[] = [];

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.initializeComponent()
  }

  //Separated so that it could be activated by a sub-component's emitted event.
  initializeComponent() {
    this.topicObjs = [];
    this.topicObjs = this.dataService.user.topics;
  }

  createTopic(form: NgForm) {
    this.http.createTopic(form.value.newTopic).subscribe((response: Response) => {
      this.dataService.message.next(response.message);
      if (response.user) {
        this.dataService.user = response.user;
        this.initializeComponent()
      }
    })
  }
}