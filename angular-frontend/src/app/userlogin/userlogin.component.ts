import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Response } from '../models/response.model';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent implements OnInit {

  constructor(private http: HttpService,
              private dataService: DataService) {}

  ngOnInit() {

  }

  //Looks in local storage for loginData, logs in with it if it is found.
  autoLogin() { 
    let loginData = JSON.parse(localStorage.getItem('loginData'));
    if (!loginData || loginData === '') {
      return false
    } else {
      this.http.userLogin(loginData.email, loginData.password)
        .subscribe((response: Response)=> {
          this.dataService.role.next('User');
          this.dataService.user = response.user;
          this.dataService.routerService.next(['user-dash'])
        });
      return true
    }
  }

  // Uses form data to log in, if successful it will: 
  // 1) Store loginData for auto-login 
  // 2) Emit the "user" role in the dataservice to let the app component know to display the user nav
  // 3) Emit the next route through my dataService to tell the app component to go to the user dashboard.
  login(form: NgForm) { 
    this.http.userLogin(form.value.email.toLowerCase(), form.value.password)
      .subscribe((response: Response) => {
        if (!response.user) {
          return this.dataService.message.next(response.message)
        } else {
          this.dataService.user = response.user
        };
        let loginData = {email: form.value.email.toLowerCase(), password: form.value.password};
        localStorage.setItem('loginData', JSON.stringify(loginData));
        this.dataService.role.next('User');
        this.dataService.routerService.next(['user-dash'])
      })
  }

  signup() {
    this.dataService.routerService.next(['signup'])
  }

  passReset() {
    this.dataService.routerService.next(['pass-reset/user'])
  }
}
