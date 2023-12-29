import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrl: './pass-reset.component.css'
})
export class PassResetComponent implements OnInit {
  role!: string;

  ngOnInit() {
    //Subscribe to the params to see if it is an admin or a user pass reset request
  }

  sendReset(form: NgForm) {
    //Checks role, set by ngOnInit function, and then calls the appropriate HTTP service
  }
}
