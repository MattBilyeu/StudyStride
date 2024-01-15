import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpService } from '../service/http.service';
import { DataService } from '../service/data.service';
import { Response } from '../models/response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private http: HttpService,
              private dataService: DataService) {}

  signup(form: NgForm) {
    if (form.value.password === form.value.confirmPassword) {
      this.http.createUser(form.value.name, form.value.email.toLowerCase(), form.value.password)
        .subscribe((response: Response) => {
          this.dataService.message.next(response.message);
          if (response.user) {
            this.dataService.user = response.user;
            this.dataService.routerService.next([''])
          }
        }, (errorResponse: HttpErrorResponse) => {
          this.dataService.message.next(errorResponse.error.message);
        })
    }
  }
}
