import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../_service/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgetForm!: FormGroup;
   myForm: any;
  loginUser: any;
  users: any;
  idUser:string | any

  constructor(
    private fb:FormBuilder,
    private authService:AuthserviceService,
    private route:Router,
    private fbs:FormBuilder
  ) {
    
  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username: new FormControl('', Validators.required),
     password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })

    this.forgetForm=this.fbs.group({
      email: new FormControl('', Validators.required),
       dob: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  
  onLogin(){
    this.authService.loginUser(this.loginForm.value.username,this.loginForm.value.password);
    this.idUser=this.loginForm.value.username;
    this.loginForm.reset();
  }

  forgetPassword(){
    let forgetData:any={
      email:this.forgetForm.value.email,
      dob:this.forgetForm.value.dob
    }

    this.authService.forgetUserPassword(forgetData);
    this.forgetForm.reset();
    this.authService.logout();
  }

 
}
