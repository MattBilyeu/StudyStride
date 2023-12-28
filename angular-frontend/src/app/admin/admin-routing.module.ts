import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AppStatsComponent } from './app-stats/app-stats.component';

const routes: Routes = [
    {
        path: '', 
        component: AdminComponent,
        children: [
            {path: '', component: AdminDashComponent},
            {path: 'admin-feedback', component: AdminFeedbackComponent},
            {path: 'app-stats', component: AppStatsComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}