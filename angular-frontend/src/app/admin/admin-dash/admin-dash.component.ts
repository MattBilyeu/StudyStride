import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { HttpService } from '../../service/http.service';
import { Response } from '../../models/response.model';
import { HttpErrorResponse } from '@angular/common/http';

interface adminInfo {
  name: string;
  _id: string

}

interface adminResponse {
  message: string,
  allAdmins: adminInfo[]
}

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent implements OnInit {
  editorConfig = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: "lists link table",
    toolbar: "numlist bullist link table"
  };
  allAdmins: adminInfo[] = [];

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.http.getAllAdmins().subscribe((response: adminResponse) => {
      this.allAdmins = response.allAdmins;
    })
  }
  
  createAdmin(form: NgForm) {
    this.http.createAdmin(form.value.name, form.value.email, form.value.password)
      .subscribe((response: Response) => {
        this.dataService.message.next(response.message);
        form.value.name = '';
        form.value.email = '';
        form.value.password = ''
      }, (errorResponse: HttpErrorResponse) => {
        this.dataService.message.next(errorResponse.error.message);
      })
  }

  deleteAdmin(form: NgForm) {
    this.http.deleteAdmin(form.value.adminId).subscribe((response: Response) => {
      this.dataService.message.next(response.message)
    }, (errorResponse: HttpErrorResponse) => {
      this.dataService.message.next(errorResponse.error.message);
    })
  }

  emailAllUsers(form: NgForm) {
    const conf = confirm('Are you sure you want to email all users?');
    if (conf) {
      this.http.emailAllUsers(form.value.subject, form.value.message)
        .subscribe((response: Response)=> {
          this.dataService.message.next(response.message);
          form.reset();
        }, (errorResponse: HttpErrorResponse) => {
          this.dataService.message.next(errorResponse.error.message);
        })
    }
  }
}
