import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {

  constructor(private dataService: DataService) {}

  login(form: NgForm) {
    this.dataService.routerService.next(['admin-dash'])
  }

  passReset() {
    this.dataService.routerService.next(['pass-reset/admin'])
  }
}
