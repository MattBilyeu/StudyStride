import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminDashComponent } from './admin-dash/admin-dash.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDashComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
