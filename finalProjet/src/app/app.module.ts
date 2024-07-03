import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NG_VALIDATORS, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { LoginComponent } from './Components/login/login.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './Components/resetpassword/resetpassword.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AuthInterceptor } from './_service/auth.interceptor';
import { NetworkComponent } from './Components/network/network.component';
import { FriendsComponent } from './Components/friends/friends.component';
import { ChangepasswordComponent } from './Components/changepassword/changepassword.component';
import { SettingComponent } from './Components/setting/setting.component';
import { CommonModule } from '@angular/common';
import { UserComponent } from './Components/user/user.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetTokenInterceptor } from './interceptors/reset-token.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CheckPasswordDirective } from './directive/password.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    DashboardComponent,
    NetworkComponent,
    FriendsComponent,
    ChangepasswordComponent,
    SettingComponent,
    UserComponent,
    CheckPasswordDirective
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [
   {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
   {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptor,multi:true},
   {provide:HTTP_INTERCEPTORS, useClass:ResetTokenInterceptor, multi:true},
   { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
