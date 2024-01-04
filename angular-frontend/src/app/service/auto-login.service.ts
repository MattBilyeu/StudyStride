import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpService } from './http.service';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class AutoLoginService {

  constructor(private http: HttpService,
              private dataService: DataService) {}

  //Looks in local storage for loginData, logs in with it if it is found.
  autoLogin() { 
    let loginData = JSON.parse(localStorage.getItem('loginData'));
    if (!loginData || loginData === '') {
      return false
    } else {
      this.http.userLogin(loginData.email, loginData.password)
        .subscribe((response: Response)=> {
          this.dataService.user = response.user;
          this.dataService.role.next('user');
          this.dataService.loggedIn = true;
          this.dataService.routerService.next(['user'])
        });
      return true
    }
  }
}