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
  messageSubscription: Subscription;
  routerSubscription: Subscription;
  title = 'Studystride';
  hideMobileNav: boolean = true;
  alert: string;

  constructor(public dataService: DataService,
              private router: Router) {}

  ngOnInit() {
    this.messageSubscription = this.dataService.message.subscribe(message => {
        this.handleMessage(message)
    });
    this.routerSubscription = this.dataService.routerService.subscribe(routes => {
      this.handleRoutes(routes)
    })
  }

  handleRoutes(routes: string[]) {
    this.router.navigate(routes)
  }

  handleMessage(message: string) {
    this.alert === message;
    setTimeout(()=> {
      this.alert = undefined
    }, 2000)
  }

  toggleMobileNav() {
    this.hideMobileNav = !this.hideMobileNav
  }

  ngOnDestroy() {
    this.messageSubscription.unsubscribe();
    this.routerSubscription.unsubscribe()
  }
}
