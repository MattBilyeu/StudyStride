import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminFeedbackComponent } from './admin-feedback/admin-feedback.component';
import { AppStatsComponent } from './app-stats/app-stats.component';
import { FormsModule } from '@angular/forms';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { FeedbackDetailComponent } from './admin-feedback/feedback-detail/feedback-detail.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashComponent,
    AdminFeedbackComponent,
    AppStatsComponent,
    FeedbackDetailComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    EditorModule
  ],
  providers: [{provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}]
})
export class AdminModule { }
