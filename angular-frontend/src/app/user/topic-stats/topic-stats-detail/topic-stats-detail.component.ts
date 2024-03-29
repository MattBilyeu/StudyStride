import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../service/data.service';
import { HttpService } from '../../../service/http.service';
import { Response } from '../../../models/response.model';
import { HttpErrorResponse } from '@angular/common/http';

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
  last7Total: number = 0;
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
    if (this.targetObj.timestamps.length > 0) {
      this.processLast7Total();
      this.processAllTimeStats();
      this.processLast30Stats()
    }
  }

  processLast7Total() {
    const start = Date.now() - (1000 * 60 * 60 * 24 * 7);
    for (let i = 0; i < this.targetObj.timestamps.length; i++) {
      const stampTime = new Date(this.targetObj.timestamps[i].stamp);
      if (stampTime.getTime() > start) {
        this.last7Total += +this.targetObj.timestamps[i].duration;
      }
    };
    this.last7Total = Math.round((this.last7Total/60)*100)/100
  }

  processAllTimeStats() {
    let start = Date.now();
    if (this.targetObj.timestamps.length > 0) {
      for (let i = 0; i < this.targetObj.timestamps.length; i++) {
        this.pastProgress.allTimeHrsStudied += +this.targetObj.timestamps[i].duration; //Iterates through each timestamp and adds its duration to the all time total
        let stampTime = new Date(this.targetObj.timestamps[i].stamp).getTime()
        if (stampTime < start) {//Checks if the current start time is earlier than the current stamp, sets the current start to the earlier of the two (will eventually equal the earliest stamp)
          start = stampTime
        }
      }
    };
    let weeksElapsed = (Date.now() - start)/(1000 * 60 * 60 * 24 * 7);
    this.pastProgress.allTimeHrsPerWeek = Math.round(((this.pastProgress.allTimeHrsStudied/60)/weeksElapsed)*100)/100;
    this.pastProgress.allTimeHrsStudied = Math.round((this.pastProgress.allTimeHrsStudied/60)*100)/100
  }

  processLast30Stats() {
    let hardStart = Date.now() - (1000 * 60 * 60 * 24 * 30);
    let softStart = Date.now(); //Allowing the possibility that the topic was started within the last 30 days - relevant to the hrs/week figure.
    if (this.targetObj.timestamps.length > 0) {
      for (let i = 0; i < this.targetObj.timestamps.length; i++) { //Iterates through each timestamp
        const stampStart = new Date(this.targetObj.timestamps[i].stamp).getTime()
        if (stampStart > hardStart && stampStart < softStart) { //If the stamp is after the hardstart but before the soft start, sets the soft start equal to the stamp and adds the duration
          softStart = stampStart;
          this.pastProgress.last30HrsStudied += +this.targetObj.timestamps[i].duration
        } else if (stampStart > hardStart) { //If it is after the hard start but failed the last condition (it is not earlier than the soft start), just add the duration
          this.pastProgress.last30HrsStudied += +this.targetObj.timestamps[i].duration
        } else { //If the stamp is earlier than the hard start, no condition is met and nothing is done with the stamp.  This means there is a stamp before the hard start, however, so hard start is set as the beginning of our time period.
          softStart = hardStart
        }
      }
    };
    let weeksElapsed = (Date.now() - softStart)/(1000 * 60 * 60 * 24 * 7);
    this.pastProgress.last30HrsPerWeek = Math.round(((this.pastProgress.last30HrsStudied/60)/weeksElapsed)*100)/100;
    this.pastProgress.last30HrsStudied = Math.round((this.pastProgress.last30HrsStudied/60)*100)/100
  }

  deleteTopic(form: NgForm) { //Confirms with the user that they want to delete the topic and the merge topic they have chosen before processing.  
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
        }, (errorResponse: HttpErrorResponse) => {
          this.dataService.message.next(errorResponse.error.message);
        })
    }
  }
}
