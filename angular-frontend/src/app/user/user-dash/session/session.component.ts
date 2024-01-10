import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataService } from '../../../service/data.service';
import { HttpService } from '../../../service/http.service';
import { User } from '../../../models/user.model';
import { Response } from '../../../models/response.model';

interface ActiveSession {
  topic: string;
  start: Date
}

interface PastProgressObj {
  last7HrsStudied: number;
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
export class SessionComponent implements OnInit, AfterViewInit {
  @ViewChild('topic') topic!: ElementRef<HTMLSelectElement>;
  user: User;
  sessionRunning: boolean = false;
  sessionTopic: string;
  sessionTimeStudied: string;
  hoursToNextBadge: Number;
  percentToBadge: Number;
  topics: string[] = [];
  intervalId: any;
  badgeUrl: string;
  pastProgress: PastProgressObj = {
    last7HrsStudied: 0,
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
    this.initializeComponent();
  }

  ngAfterViewInit() {
    if (this.topics.length !== 0) {
      this.topic.nativeElement.value = this.topics[0] //For convenience, sets the select to a topic so that the user can start a session with one click.
    }
  }

  //Gets the user object from the dataService, if the user has an active session then it passes that session off to the handler function.
  //Sets the topics array to the topics the user has created.
  //Sets times for the past progress property for the all time numbers, calls the handler to get the last 30 properties since the math for them is more complicated.
  initializeComponent() {
    this.user = this.dataService.user;
    if (this.user.badges.length > 0) {
      setTimeout(()=> {
        const index = this.user.badges.length -1;
        this.badgeUrl = 'badge/' + this.user.badges[index];
        setTimeout(()=> {
          this.badgeUrl = undefined
        }, 5000)
      }, 2000)
    };
    this.pastProgress.allTimeBadgesEarned = this.user.badges.length;
    if (this.user.activeSession) {
      this.handleSessionObj(this.user.activeSession);
    };
    if (this.user.topics.length > 0) {
      this.topics = this.user.topics.map(topicObj => topicObj.topic);
      this.processLast7Studied(this.user);
      this.processAllTimeStats(this.user);
      this.processBadgeStats(this.user);
      this.processLast30Stats(this.user)
    }
  }

  processLast7Studied(user: User) {
    const startDate = Date.now() - (1000 * 60 * 60 * 24 * 7); //Sets the start date to 7 days ago
    let accumulatedMinutes = 0;
    user.topics.forEach(topicObj => {
      if (topicObj.timestamps.length > 0) {
        for (let i = 0; i < topicObj.timestamps.length; i++) { //Iterates through each timestamp of each topic, adds its duration only if its timestamp is later than the start date
          const stampDate = new Date(topicObj.timestamps[i].stamp)
          if (stampDate.getTime() > startDate) {
            accumulatedMinutes += +topicObj.timestamps[i].duration
          }
        }
      }
    });
    this.pastProgress.last7HrsStudied = Math.round((accumulatedMinutes/60)*100)/100
  }

  processAllTimeStats(user: User) {
    for (let i = 0; i < user.topics.length; i++) {//Iterates through each topic
      for (let y = 0; y < user.topics[i].timestamps.length; y++) { //Iterates through each timestamp of that topic
        this.pastProgress.allTimeHrsStudied += +user.topics[i].timestamps[y].duration //Adds the timestamp's duration to the total hrs
      }
    }
    this.pastProgress.allTimeHrsStudied = Math.round((this.pastProgress.allTimeHrsStudied/60)*100)/100;
    const userCreated = new Date(user.createDate);
    let weeksElapsed = (Date.now() - userCreated.getTime())/(1000 * 60 * 60 * 24 * 7);
    this.pastProgress.allTimeHrsPerWeek = Math.round(+((+this.pastProgress.allTimeHrsStudied)/weeksElapsed)*100)/100
  }

  processBadgeStats(user: User) {
    let accumulatedMinutes = 0;
    for (let i = 0; i < user.topics.length; i++) { //Iterates over every topic
      const targetTopic = user.topics[i];
      if (targetTopic.timestamps.length > 0) { //Checks if the topic has timestamps
        targetTopic.timestamps.forEach(stampObj => accumulatedMinutes += +stampObj.duration) //Adds the duration from each timestamp to the accumulated minutes
      }
    };
    const remainingMinutes = (10*60) - (accumulatedMinutes % (10*60)); //Finds the uncompleted portion of the minutes in a badge (10*60)
    this.hoursToNextBadge =  Math.round((remainingMinutes/60)*100)/100 //Converts the remaining minutes to hours and then rounds to the nearest 100ths place
    this.percentToBadge = Math.floor((+this.hoursToNextBadge/10)*100)
  }

  //Sets a start date equal to 30 days ago, iterates through each topic and adds up the durations if their stamp is after the start date, 
  //then converts those minutes to hours for the last30Hrs and last30HrsPerWeek
  processLast30Stats(user: User) {
    const startDate = Date.now() - (1000 * 60 * 60 * 24 * 30);
    let softStart = Date.now();
    let accumulatedMinutes = 0;
    user.topics.forEach(topicObj => {
      if (topicObj.timestamps.length > 0) {
        for (let i = 0; i < topicObj.timestamps.length; i++) {
          const stampDate = new Date(topicObj.timestamps[i].stamp)
          if (stampDate.getTime() > startDate && stampDate.getTime() < softStart) {
            softStart = stampDate.getTime();
            accumulatedMinutes += +topicObj.timestamps[i].duration
          } else if (stampDate.getTime() > startDate) {
            softStart = startDate;
            accumulatedMinutes += +topicObj.timestamps[i].duration
          }
        }
      }
    });
    const weeksElapsed = (Date.now() - softStart)/(1000 * 60 * 60 * 24 * 7);
    this.pastProgress.last30HrsStudied = Math.round((accumulatedMinutes/60)*100)/100;
    this.pastProgress.last30HrsPerWeek = Math.round((this.pastProgress.last30HrsStudied/weeksElapsed)*100)/100;
    this.pastProgress.last30Badges = Math.floor(this.pastProgress.last30HrsStudied/10)
  }

  //Sets the session topic - for use with the endSession function.
  //Gets the duration between the session start time and now, converts that to a string in "X hrs Y mins", and sets the component variable to the string.
  //Sets an interval to update the string once per minute.
  handleSessionObj(session: ActiveSession) {
    this.sessionTopic = session.topic;
    this.sessionRunning = true;
    const now = new Date();
    const sessionStart = new Date(session.start);
    let currentDuration = now.getTime() - sessionStart.getTime();
    currentDuration = Math.floor(currentDuration / (60 * 1000));
    if (currentDuration < 1) {
      this.sessionTimeStudied = `0 mins`
    } else if (currentDuration < 60) {
      this.sessionTimeStudied = `${currentDuration} mins`
    } else {
      let hours = Math.floor(currentDuration/60);
      let minutes = Math.floor((currentDuration % 60));
      this.sessionTimeStudied = `${hours} hrs ${minutes} mins`;
    }
    this.intervalId = setInterval(()=> {
      let now = new Date();
      let currentDuration = now.getTime() - sessionStart.getTime();
      currentDuration = Math.floor(currentDuration / (60 * 1000));
      if (currentDuration < 60) {
        this.sessionTimeStudied = `${currentDuration} mins`
      } else {
        let hours = Math.floor(currentDuration/60);
        let minutes = Math.floor((currentDuration % 60));
        this.sessionTimeStudied = `${hours} hrs ${minutes} mins`;
      }
    }, (60 * 1000))
  }

  //Checks if a topic was selected, alerts the user if not.
  //If a topic was selected, 
  startSession() {
    if (this.topic.nativeElement.value !== '') {
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
        this.sessionRunning = false;
        clearInterval(this.intervalId);
        this.initializeComponent();
      }
    })
  }
}
