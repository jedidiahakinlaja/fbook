import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from '../../_service/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  registerForm!: FormGroup;
   myForm: any;
  loginUser: any;

  constructor(
    private fb:FormBuilder,
    private authService:AuthserviceService
  
  ) { }

  ngOnInit(): void {
    this.registerForm=this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
     password: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
 
  }

  onRegister(){
      this.authService.registerUser(
      this.registerForm.value.firstName,
      this.registerForm.value.lastName,
      this.registerForm.value.username,
      this.registerForm.value.password,
      this.registerForm.value.email,
      this.registerForm.value.dob
    )
      
      this.registerForm.reset();
  }

}
