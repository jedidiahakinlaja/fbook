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
   myForm: any;
  loginUser: any;
  users: any;
  idUser:string | any

  constructor(
    private fb:FormBuilder,
    private authService:AuthserviceService,
    private route:Router
  ) {
    
  }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username: new FormControl('', Validators.required),
     password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  
  onLogin(){
    this.authService.loginUser(this.loginForm.value.username,this.loginForm.value.password);
    this.idUser=this.loginForm.value.username;
    localStorage.setItem('user',this.idUser);
    this.loginForm.reset();
  }

 
}
