import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
  activeSession: boolean = false;

  ngOnInit() {
  }

  startSession() {
    this.activeSession = true
  }

  endSession() {
    this.activeSession = false
  }
}
