import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HeaderComponent } from './Components/header/header.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NetworkComponent } from './Components/network/network.component';
import { FriendsComponent } from './Components/friends/friends.component';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';
import { SettingComponent } from './Components/setting/setting.component';
import { UserComponent } from './Components/user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetTokenGuard } from './guards/reset-token.guard';
import { AdminGuard } from './guards/admin.guard';
const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'register',component:HeaderComponent},
  {path:'login',component:LoginComponent},
  {path:'resetpassword',component:ResetpasswordComponent,canActivate:[ ResetTokenGuard]},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'dashboard',component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'network',component:NetworkComponent,canActivate:[AuthGuard]},
  {path:'friends',component:FriendsComponent, canActivate:[AuthGuard]},
  {path:'changepassword', component:ChangepasswordComponent},
  {path:'setting',component:SettingComponent,canActivate:[AuthGuard]},
  {path:'user',component:UserComponent,canActivate:[AdminGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
