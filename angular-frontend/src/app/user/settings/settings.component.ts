import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  testEmail: string = 'email'

  updateEmail(form: NgForm) {
    //Email and confirm email
  }

  seedTime(form: NgForm) {
    //time and topic
  }

  toggleReceiveEmails() {
    //Button
  }

  deleteUser() {
    //Prompt for 'delete + user email'
    const value = prompt(`Type "delete ${this.testEmail}" to delete your account.`)
    if (value === 'delete ' + this.testEmail) {
      alert('Success')
    }
  }
}
