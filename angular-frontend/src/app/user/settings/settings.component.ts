import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../../service/data.service';
import { HttpService } from '../../service/http.service';
import { Response } from '../../models/response.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent implements OnInit {
  userEmail: string;
  receivesEmailsMess: string = 'Turn OFF emails:';
  topics: string[] = [];

  constructor(private dataService: DataService,
              private http: HttpService) {}

  ngOnInit() {
    this.userEmail = this.dataService.user.email;
    if (!this.dataService.user.receivesEmails) {
      this.receivesEmailsMess = 'Turn ON emails:'
    };
    this.dataService.user.topics.forEach(topicObj => this.topics.push(topicObj.topic))
  }

  updateEmail(form: NgForm) {
    const email = form.value.email.toLowerCase();
    const confirmEmail = form.value.confirmEmail.toLowerCase();
    if (email !== confirmEmail) {
      return alert('Email and confirm email must match.')
    };
    this.http.updateEmail(this.userEmail, email, form.value.password)
      .subscribe((response: Response)=> {
        this.dataService.message.next(response.message);
        if (response.user) {
          this.dataService.user = response.user;
          this.userEmail = response.user.email;
        }
      })
  }

  seedTime(form: NgForm) {
    let conf = true;
    if (form.value.seedTime > 180) {
      let hours = Math.round((form.value.seedTime/60)*100)/100;
      conf = confirm(`Are you sure you want to seed ${hours} hrs?  Seeding excessive time can permanently throw off your statistics.  Seeding is meant for minor adjustments (such as forgetting to start or stop the clock).`)
    };
    if (conf) {
      this.http.seedTime(form.value.seedTime, form.value.seedTopic)
      .subscribe((response: Response) => {
        this.dataService.message.next(response.message);
        if (response.user) {
          this.dataService.user = response.user
        }
      })
    }
  }

  toggleReceiveEmails() {
    this.http.toggleReceiveEmails().subscribe((response: Response) => {
      this.dataService.message.next(response.message);
      if (response.user) {
        this.dataService.user = response.user;
        if (this.receivesEmailsMess === 'Turn OFF emails:') {
          this.receivesEmailsMess = 'Turn ON emails:'
        } else {
          this.receivesEmailsMess = 'Turn OFF emails:'
        }
      }
    })
  }

  deleteUser() {
    const value = prompt(`Type "delete ${this.userEmail}" to delete your account.`)
    if (value === 'delete ' + this.userEmail) {
      this.http.deleteUser(this.dataService.user._id)
        .subscribe((response:Response) => {
          this.dataService.message.next(response.message);
          if (response.message === 'User deleted.') {
            this.dataService.loggedIn = false;
            this.dataService.user = undefined;
            this.dataService.role.next('');
            localStorage.removeItem('loginData');
            this.dataService.routerService.next([''])
          }
        })
    }
  }
}
