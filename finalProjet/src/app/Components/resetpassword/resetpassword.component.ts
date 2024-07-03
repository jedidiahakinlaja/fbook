import { Component, Directive, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/_service/authservice.service';


@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resetForm!: FormGroup;
  constructor(
    private fb:FormBuilder,
    private authService:AuthserviceService
  ) { }

  ngOnInit(): void {

    this.resetForm=this.fb.group({
      password: new FormControl('', [Validators.required , Validators.minLength(4)]),
      confirmpassword: new FormControl('', [Validators.required, Validators.minLength(4)])
    })
  }

  resetPasswordForm(){
    let forgetData:any={
      password:this.resetForm.value.password
    }
    this.authService.changePassword(forgetData);
    this.resetForm.reset();
  }

}
