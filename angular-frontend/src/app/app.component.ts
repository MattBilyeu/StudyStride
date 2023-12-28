import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  title = 'Studystride';
  hideMobileNav: boolean = true;
  alert: string;

  constructor(public dataService: DataService,
              private router: Router) {}

  ngOnInit() {
    this.subscription = this.dataService.message.subscribe(message => {
      if (message === 'user logged in') {
        this.router.navigate(['user'])
      } else if (message === 'user password reset') {
        this.router.navigate(['pass-reset/user'])
      } else if (message === 'admin logged in') {
        this.router.navigate(['admin-dash'])
      } else if (message === 'admin password reset') {
        this.router.navigate(['pass-reset/admin'])
      } else if (message === 'signup') {
        this.router.navigate(['signup'])
      } else {
        this.handleMessage(message);
      }
    })
  }

  handleMessage(messsage: string) {
    this.alert === 'alert';
    setTimeout(()=> {
      this.alert = undefined
    }, 2000)
  }

  toggleMobileNav() {
    this.hideMobileNav = !this.hideMobileNav
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
