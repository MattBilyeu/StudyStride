import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';
import { NgForm } from '@angular/forms';

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

  login(form: NgForm) {
    this.dataService.routerService.next(['user'])
  }

  signup() {
    this.dataService.routerService.next(['signup'])
  }

  passReset() {
    this.dataService.routerService.next(['pass-reset/user'])
  }
}
