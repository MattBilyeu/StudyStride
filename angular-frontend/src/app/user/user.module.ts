import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserDashComponent } from './user-dash/user-dash.component';
import { SessionComponent } from './user-dash/session/session.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { TopicStatsComponent } from './topic-stats/topic-stats.component';
import { SettingsComponent } from './settings/settings.component';
import { MilestonesComponent } from './user-dash/milestones/milestones.component';
import { UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    UserComponent,
    UserDashComponent,
    SessionComponent,
    UserFeedbackComponent,
    TopicStatsComponent,
    SettingsComponent,
    MilestonesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
