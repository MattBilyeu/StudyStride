import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Studystride';
  hideMobileNav: boolean = true;

  toggleMobileNav() {
    this.hideMobileNav = !this.hideMobileNav
  }
}
