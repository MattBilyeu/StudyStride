import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  user: User;
  message = new Subject<String>();
  routerService = new Subject<String[]>();
  loggedIn: Boolean = true;
  role = new Subject<String>()
  
  constructor() { }
}
