import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '../models/response.model';
import { AutoLoginService } from '../service/auto-login.service';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent implements OnInit {

  constructor(private http: HttpService,
              private dataService: DataService,
              private autoLogin: AutoLoginService) {}

  ngOnInit() {
    this.autoLogin.autoLogin();
  }

  // Uses form data to log in, if successful it will: 
  // 1) Store loginData for auto-login 
  // 2) Emit the "user" role in the dataservice to let the app component know to display the user nav
  // 3) Emit the next route through my dataService to tell the app component to go to the user dashboard.
  login(form: NgForm) { 
    this.http.userLogin(form.value.email.toLowerCase(), form.value.password)
      .subscribe((response: Response) => {
        if (!response.user) {
          console.log('failed login, response: ', response);
          this.dataService.message.next('failed login');
          return this.dataService.message.next(response.message)
        } else {
          this.dataService.user = response.user;
          this.dataService.role.next('user');
          this.dataService.loggedIn = true;
          this.dataService.routerService.next(['user'])
        };
        let loginData = {email: form.value.email.toLowerCase(), password: form.value.password};
        localStorage.setItem('loginData', JSON.stringify(loginData));
        this.dataService.role.next('user');
        this.dataService.routerService.next(['user'])
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.dataService.message.next(error.error.message);
      })
  }

  signup() {
    this.dataService.routerService.next(['signup'])
  }

  passReset() {
    this.dataService.routerService.next(['pass-reset/user'])
  }
}
