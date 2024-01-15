import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';
import { HttpService } from '../service/http.service';
import { Response } from '../models/response.model';
import { AutoLoginService } from '../service/auto-login.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent implements OnInit {

  constructor(private dataService: DataService,
              private http: HttpService,
              private loginService: AutoLoginService) {}

  ngOnInit() {
    this.loginService.adminAutoLogin()
  }

  login(form: NgForm) {
    this.http.adminLogin(form.value.email, form.value.password)
      .subscribe((response: Response) => {
        if (response.message === 'Login successful') {
          this.dataService.routerService.next(['admin-dash']);
          this.dataService.loggedIn = true;
          this.dataService.role.next('admin');
          let loginData = {email: form.value.email.toLowerCase(), password: form.value.password};
          localStorage.setItem('adminLoginData', JSON.stringify(loginData));
        } else {
          this.dataService.message.next('Login failed.')
        }
      }, (errorResponse: HttpErrorResponse) => {
        this.dataService.message.next(errorResponse.error.message);
      })
  }

  passReset() {
    this.dataService.routerService.next(['admin-pass-reset/admin'])
  }
}
