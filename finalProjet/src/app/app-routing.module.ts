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

const routes: Routes = [
  {path:'header',component:HeaderComponent},
  {path:'',component:LoginComponent},
  {path:'resetpassword',component:ResetpasswordComponent},
  {path:'forgetpassword',component:ForgetpasswordComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'network',component:NetworkComponent},
  {path:'friends',component:FriendsComponent},
  {path:'changepassword', component:ChangepasswordComponent},
  {path:'setting',component:SettingComponent},
  {path:'user',component:UserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
