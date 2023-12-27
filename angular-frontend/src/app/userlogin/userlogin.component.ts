import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrl: './userlogin.component.css'
})
export class UserloginComponent implements OnInit {

  constructor(private http: HttpService,
              private dataService: DataService,
              private router: Router) {}

  ngOnInit() {

  }

  login(form: NgForm) {

  }

  passReset() {
    this.dataService.message.next('user password reset')
  }
}
