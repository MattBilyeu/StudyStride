import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrl: './admin-dash.component.css'
})
export class AdminDashComponent {
  editorConfig = {
    base_url: '/tinymce',
    suffix: ".min",
    plugins: "lists link table",
    toolbar: "numlist bullist link table"
  };
  
  createAdmin(form: NgForm) {

  }

  deleteAdmin(form: NgForm) {

  }

  emailAllUsers(form: NgForm) {

  }
}
