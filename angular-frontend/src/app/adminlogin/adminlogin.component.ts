import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';
import { HttpService } from '../service/http.service';
import { Response } from '../models/response.model';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent implements OnInit {

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    let loginData = JSON.parse(localStorage.getItem('adminLoginData'));
    if (!loginData || loginData === '') {
      return false
    } else {
      this.http.adminLogin(loginData.email, loginData.password)
        .subscribe((response: Response)=> {
          this.dataService.user = response.user;
          this.dataService.role.next('admin');
          this.dataService.loggedIn = true;
          this.dataService.routerService.next(['admin-dash'])
        });
      return true
    }
  }

  login(form: NgForm) {
    this.http.adminLogin(form.value.email, form.value.password)
      .subscribe((response: Response) => {
        if (!response.user) {
          this.dataService.routerService.next(['admin-dash']);
          this.dataService.loggedIn = true;
          this.dataService.role.next('admin');
          let loginData = {email: form.value.email.toLowerCase(), password: form.value.password};
          localStorage.setItem('adminLoginData', JSON.stringify(loginData));
        } else {
          this.dataService.message.next('Login failed.')
        }
      })
  }

  passReset() {
    this.dataService.routerService.next(['admin-pass-reset/admin'])
  }
}
