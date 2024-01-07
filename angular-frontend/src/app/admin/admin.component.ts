import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (!this.dataService.loggedIn) {
      this.dataService.routerService.next(['admin'])
    }
  }
}
