import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { HttpService } from '../../../service/http.service';
import { User } from '../../../models/user.model';
import { Response } from '../../../models/response.model';

interface ActiveSession {
  topic: string;
  start: Date
}

interface PastProgressObj {
  last30HrsStudied: number;
  last30HrsPerWeek: number;
  last30Badges: number;
  allTimeHrsStudied: number;
  allTimeHrsPerWeek: number;
  allTimeBadgesEarned: number
}

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit, OnDestroy {
  @ViewChild('topic') topic!: ElementRef<HTMLSelectElement>;
  user: User;
  sessionRunning: Boolean = false;
  sessionTopic: string;
  sessionTimeStudied: string;
  hoursToNextBadge: Number;
  percentToBadge: Number;
  topics: string[] = [];
  intervalId: any;
  pastProgress: PastProgressObj = {
    last30HrsStudied: 0,
    last30HrsPerWeek: 0,
    last30Badges: 0,
    allTimeHrsStudied: 0,
    allTimeHrsPerWeek: 0,
    allTimeBadgesEarned: 0
  };

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.initializeComponent()
  }

  //Gets the user object from the dataService, if the user has an active session then it passes that session off to the handler function.
  //Sets the topics array to the topics the user has created.
  //Sets times for the past progress property for the all time numbers, calls the handler to get the last 30 properties since the math for them is more complicated.
  initializeComponent() {
    this.user = this.dataService.user;
    if (this.user.activeSession) {
      this.handleSessionObj(this.user.activeSession);
    };
    this.topics = this.user.topics.map(topicObj => topicObj.topic);
    if (this.topics.length !== 0) {
      this.topic.nativeElement.value = this.topics[0] //For convenience, sets the select to a topic so that the user can start a session with one click.
    }
    this.pastProgress.allTimeHrsStudied = +this.user.totalTime;
    this.pastProgress.allTimeBadgesEarned = this.user.badges.length;
    let weeksElapsed = (this.user.createDate.getTime() - Date.now())/(1000 * 60 * 60 * 24 * 7);
    this.pastProgress.allTimeHrsPerWeek = Number((+this.user.totalTime/weeksElapsed).toFixed(2))
  }

  //Sets the session topic - for use with the endSession function.
  //Gets the duration between the session start time and now, converts that to a string in "X hrs Y mins", and sets the component variable to the string.
  //Sets an interval to update the string once per minute.
  handleSessionObj(session: ActiveSession) {
    this.sessionTopic = session.topic;
    this.sessionRunning = true;
    let now = new Date();
    let currentDuration = now.getTime() - session.start.getTime();
    currentDuration = Math.floor(currentDuration / (60 * 1000));
    if (currentDuration < 60) {
      this.sessionTimeStudied = `${currentDuration} mins`
    } else {
      let hours;
      let minutes;
      hours = Math.floor(currentDuration/60);
      minutes = Math.floor((currentDuration % 60));
      this.sessionTimeStudied = `${hours} hrs ${minutes} mins`;
    }
    this.intervalId = setInterval(()=> {
      let now = new Date();
      let currentDuration = now.getTime() - session.start.getTime();
      currentDuration = Math.floor(currentDuration / (60 * 1000));
      if (currentDuration < 60) {
        this.sessionTimeStudied = `${currentDuration} mins`
      } else {
        let hours;
        let minutes;
        hours = Math.floor(currentDuration/60);
        minutes = Math.floor((currentDuration % 60));
        this.sessionTimeStudied = `${hours} hrs ${minutes} mins`;
      }
    }, (60 * 1000))
  }

  //Checks if a topic was selected, alerts the user if not.
  //If a topic was selected, 
  startSession() {
    if (this.topic) {
      const topicValue = this.topic.nativeElement.value;
      this.http.startSession(topicValue).subscribe((response: Response) => {
        this.dataService.message.next(response.message);
        if (response.user) {
          this.dataService.user = response.user;
          this.initializeComponent();
        }
      })
    } else {
      alert('Please select a topic.')
    }
  }

  //Checks if a session is running, ends it if so and updates the user in both back and frontend
  endSession() {
    if (!this.sessionRunning) {
      return alert('No session is running.')
    }
    this.http.endSession().subscribe((response: Response) => {
      this.dataService.message.next(response.message);
      if (response.user) {
        this.dataService.user = response.user;
        this.initializeComponent();
      }
    })
  }

  //Iterates through each timestamp from each topic; if the timestamp occurred in the last 30 days it adds the stamps duration to the property for the last 30 days hours studied
  //Sets the last 30 hours per week and last 30 badges based off of the above.
  loadLast30Progress() {
    for (let i = 0; i < this.user.topics.length; i++) {
      let topic = this.user.topics[i];
      for (let i = 0; i < topic.timestamps.length; i++) {
        let pastStartLine = Date.now() - (1000 * 60 * 60 * 24 * 30);
        if (topic.timestamps[i].stamp.getTime() > pastStartLine) {
          this.pastProgress.last30HrsStudied = +this.pastProgress.last30HrsStudied + +topic.timestamps[i].duration
        }
      }
    };
    this.pastProgress.last30HrsStudied = Number((this.pastProgress.allTimeHrsStudied/60).toFixed(2));
    this.pastProgress.last30HrsPerWeek = +this.pastProgress.last30HrsStudied/(30/7);
    this.pastProgress.last30Badges = Math.floor(this.pastProgress.last30HrsStudied/10)
  }

  ngOnDestroy() {
    if (this.sessionRunning) {
      this.dataService.message.next('Ending session...');
      this.endSession();
    }
  }
}
