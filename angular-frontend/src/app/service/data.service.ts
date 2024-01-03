import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: User;
  message = new Subject<string>();
  routerService = new Subject<string[]>();
  loggedIn: Boolean = false;
  role = new Subject<string>();
  feedbacks: Feedback[]
  
  constructor() { }
}
