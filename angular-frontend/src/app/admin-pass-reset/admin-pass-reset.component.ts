import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { DataService } from '../service/data.service';
import { Subscription } from 'rxjs';
import { HttpService } from '../service/http.service';
import { Response } from '../models/response.model';

@Component({
  selector: 'app-admin-pass-reset',
  templateUrl: './admin-pass-reset.component.html',
  styleUrl: './admin-pass-reset.component.css'
})
export class AdminPassResetComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  paramInfo!: string;
  requestReset: boolean = true;

  constructor(private route: ActivatedRoute,
              private http: HttpService,
              private dataService: DataService) {}

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.paramInfo = params['paramInfo'];
      if (this.paramInfo !== 'admin') {
        this.requestReset = false;
      }
    })
  }

  resetPassword(form: NgForm) {
    const password = form.value.password;
    const confirmPassword = form.value.confirmPassword;
    if (password !== confirmPassword) {
      return alert('Passwords must match.')
    } else {
      this.http.updateAdminPassword(this.paramInfo, password).subscribe((response: Response) => {
        this.dataService.message.next(response.message);
        if (response.user) {
          this.dataService.user = response.user;
          this.dataService.routerService.next([''])
        }
      })
    }
  }

  sendReset(form: NgForm) {
    this.http.sendAdminPassUpdate(form.value.email).subscribe((response: Response) => {
      this.dataService.message.next(response.message)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}