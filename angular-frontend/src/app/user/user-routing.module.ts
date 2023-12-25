import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDashComponent } from './user-dash/user-dash.component';
import { UserFeedbackComponent } from './user-feedback/user-feedback.component';
import { TopicStatsComponent } from './topic-stats/topic-stats.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        children: [
            {path: '', component: UserDashComponent},
            {path: 'feedback', component: UserFeedbackComponent},
            {path: 'topic-stats', component: TopicStatsComponent},
            {path: 'settings', component: SettingsComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }