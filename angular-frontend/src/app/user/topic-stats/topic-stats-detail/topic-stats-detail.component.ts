import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { HttpService } from '../../../service/http.service';
import { Response } from '../../../models/response.model';

interface Timestamp {
  stamp: Date;
  duration: Number
}

interface TopicObj {
  topic: string;
  timestamps: Timestamp[];
}

interface PastProgressObj {
  last30HrsStudied: number;
  last30HrsPerWeek: number;
  allTimeHrsStudied: number;
  allTimeHrsPerWeek: number;
}

@Component({
  selector: 'app-topic-stats-detail',
  templateUrl: './topic-stats-detail.component.html',
  styleUrl: './topic-stats-detail.component.css'
})
export class TopicStatsDetailComponent implements OnInit {
  @Output() updated: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() index: number;
  @Input() topic: string;
  targetObj: TopicObj;
  topics: string[] = [];
  pastProgress: PastProgressObj = {
    last30HrsStudied: 0,
    last30HrsPerWeek: 0,
    allTimeHrsStudied: 0,
    allTimeHrsPerWeek: 0,
  };

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.targetObj = this.dataService.user.topics.filter(topicObj => topicObj.topic === this.topic)[0]; //Sets the topic for this component.
    this.dataService.user.topics.forEach(topicObj => this.topics.push(topicObj.topic)); //Populates all of the topic names the user has (used for the merge topics function)
    for (let i = 0; i < this.targetObj.timestamps.length; i++) {
      this.pastProgress.allTimeHrsStudied += +this.targetObj.timestamps[i].duration //Adds the duration of all the time stamps
      let start = Date.now() - (1000 * 60 * 60 * 24 * 30);
      if (this.targetObj.timestamps[i].stamp.getTime() < start) {
        this.pastProgress.last30HrsStudied += +this.targetObj.timestamps[i].duration //Adds the duration to the last 30 total if its stamp is within the last 30 days
      }
    };
    this.pastProgress.last30HrsPerWeek = this.pastProgress.last30HrsStudied/ (30/7);
    let start = Date.now();
    for (let i = 0; i < this.targetObj.timestamps.length; i++) {
      if (this.targetObj.timestamps[i].stamp.getTime() < start) {
        start = this.targetObj.timestamps[i].stamp.getTime() //Sets the start date to equal the earliest stamp in the object.
      }
    };
    const weeksElapsed = (Date.now() - start)/(1000 * 60 * 60 * 24 * 7); //Finds the weeks elapsed since the start date.
    this.pastProgress.allTimeHrsPerWeek = this.pastProgress.allTimeHrsStudied/weeksElapsed; //Sets the hrs per week based on the weeks elapsed since the start date.
  }

  deleteTopic(form: NgForm) {
    if (form.value.mergeTopic === this.targetObj.topic) {
      return alert('You cannot marge a topic with itself.')
    };
    let conf;
    if (form.value.mergeTopic === 'None') {
      conf = confirm(`Are you sure you want to delete ${this.targetObj.topic} and all its timestamps without merging them?  You will lose the recorded time.`)
    } else {
      conf = confirm(`Are you sure you want to delete ${this.targetObj.topic} and merge its timestamps with ${form.value.mergeTopic} and then delete ${this.targetObj.topic}?  This action is irreversable.`)
    };
    if (conf) {
      this.http.deleteTopic(this.targetObj.topic, form.value.mergeTopic)
        .subscribe((response: Response) => {
          this.dataService.message.next(response.message);
          if (response.user) {
            this.dataService.user = response.user;
            this.updated.emit(true)
          }
        })
    }
  }
}
