import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  message = new Subject<string>();
  loggedIn: boolean = true;
  
  constructor() { }
}
