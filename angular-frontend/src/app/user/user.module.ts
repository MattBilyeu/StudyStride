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
import { FormsModule } from '@angular/forms';
import { TopicStatsDetailComponent } from './topic-stats/topic-stats-detail/topic-stats-detail.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';


@NgModule({
  declarations: [
    UserComponent,
    UserDashComponent,
    SessionComponent,
    UserFeedbackComponent,
    TopicStatsComponent,
    SettingsComponent,
    MilestonesComponent,
    TopicStatsDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    EditorModule
  ],
  providers: [{provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}],
})
export class UserModule { }
