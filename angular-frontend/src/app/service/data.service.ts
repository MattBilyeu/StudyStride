import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: User = {
    name: 'Fred',
    email: 'String',
    password: 'redacted',
    createDate: new Date(),
    receivesEmails: true,
    totalTime: 400,
    topics: [{
      topic: 'Test',
      timestamps: [{
        stamp: new Date(),
        duration: 1000
      }]
    }],
    milestones: [],
    userActiveUntil: new Date(),
    badges: [],
    banned: false
  };
  message = new Subject<string>();
  routerService = new Subject<string[]>();
  loggedIn: Boolean = true;
  role = new Subject<string>();
  feedbacks: Feedback[]
  
  constructor() { }
}
