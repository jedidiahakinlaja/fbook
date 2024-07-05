import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthserviceService } from 'src/app/_service/authservice.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  fectchedLists:any = {};
  lastId: any;
  list_id:any
  resetForm!: FormGroup;
  
  myReactiveForm:FormGroup=new FormGroup({
    rsFirstName:new FormControl('',[Validators.required]),
    rsLastName:new FormControl('',[Validators.required]),
    rsUserName:new FormControl('',[Validators.required]),
    rsEmail:new FormControl('',[Validators.required]),
    // rsPassword:new FormControl('',[Validators.required]),
    // rsDob:new FormControl('',Validators.required)
  });

  constructor(
    private fb:FormBuilder,
    private authService:AuthserviceService,
    private route:Router
  ) { 
   
  } 

  ngOnInit(): void {
    this.authService.getuserDetails().subscribe({
      next:(response)=>{
        this.fectchedLists=response;
        console.log(this.fectchedLists[0].firstname);
        localStorage.setItem('edit_id', this.fectchedLists[0]._id);
        this.myReactiveForm.setValue({
          rsFirstName:this.fectchedLists[0].firstname,
          rsLastName:this.fectchedLists[0].lastname,
          rsUserName:this.fectchedLists[0].username,
          rsEmail:this.fectchedLists[0].email,
        
        })
      },
      error:(err)=>console.log(err)
 })  

 this.resetForm=this.fb.group({
  password: new FormControl('', [Validators.required , Validators.minLength(4)]),
  confirmpassword: new FormControl('', [Validators.required, Validators.minLength(4)])
})

    
  }


 
  editSetting(){
    console.log(this.myReactiveForm);
    let updatSetting:any={
     firstname:this.myReactiveForm.value.rsFirstName,
     lastname:this.myReactiveForm.value.rsLastName,
     username:this.myReactiveForm.value.rsUserName,
     email:this.myReactiveForm.value.rsEmail
   }

   this.authService.editSetting(updatSetting)
  }



  resetPasswordForm(){
    let forgetData:any={
      password:this.resetForm.value.password
    }
    this.authService.changePassword(forgetData);
    this.resetForm.reset();
  }


  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}


}



