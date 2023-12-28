import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AppStatsComponent } from './app-stats/app-stats.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashComponent,
    AdminFeedbackComponent,
    AppStatsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
