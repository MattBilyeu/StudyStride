import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  constructor(private dataService: DataService) {}

  ngOnInit() {
    if (!this.dataService.loggedIn) {
      this.dataService.routerService.next([''])
    }
  }
}
