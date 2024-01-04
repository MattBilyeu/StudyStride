import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from './service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutoLoginService } from './service/auto-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  messageSubscription: Subscription;
  routerSubscription: Subscription;
  roleSubscription: Subscription;
  title = 'Studystride';
  hideMobileNav: boolean = true;
  alert: string;
  role: string

  constructor(public dataService: DataService,
              private router: Router,
              private route: ActivatedRoute,
              private autoLogin: AutoLoginService) {}

  ngOnInit() {
    this.messageSubscription = this.dataService.message.subscribe(message => {
        this.handleMessage(message)
    });
    this.routerSubscription = this.dataService.routerService.subscribe(routes => {
      this.handleRoutes(routes)
    });
    this.roleSubscription = this.dataService.role.subscribe(role => this.role = role);
    this.route.url.subscribe(segments => {
      const hasAdmin = segments.filter(segment => segment.toString() == 'admin');
      if (hasAdmin.length !== 0) {
        this.autoLogin.autoLogin();
      }
    })
  }

  handleRoutes(routes: string[]) {
    this.router.navigate(routes)
  }

  handleMessage(message: string) {
    this.alert = message;
    setTimeout(()=> {
      this.alert = undefined
    }, 2000)
  }

  toggleMobileNav() {
    this.hideMobileNav = !this.hideMobileNav
  }

  logout() {
    this.dataService.loggedIn = false;
    this.dataService.user = undefined;
    this.role = undefined;
    this.router.navigate(['']);
    localStorage.removeItem('loginData')
  }

  ngOnDestroy() {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    if (this.roleSubscription) {
      this.roleSubscription.unsubscribe();
    }
  }
}
