import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserloginComponent } from './userlogin/userlogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { SignupComponent } from './signup/signup.component';
import { AdminPassResetComponent } from './admin-pass-reset/admin-pass-reset.component';

const routes: Routes = [
  {path: '', component: UserloginComponent},
  {path: 'admin', component: AdminloginComponent},
  {path: 'pass-reset/:paramInfo', component: PassResetComponent},
  {path: 'admin-pass-reset/:paramInfo', component: AdminPassResetComponent},
  {path: 'signup', component: SignupComponent},
  {
    path: 'user',
    loadChildren: ()=> import('./user/user.module').then(m => m.UserModule)
  },
  {
    path: 'admin-dash',
    loadChildren: ()=> import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
