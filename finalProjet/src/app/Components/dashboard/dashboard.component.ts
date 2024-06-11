import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Profile } from 'src/app/_service/authModel';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  conso: string | any
  form!: FormGroup 
  profile: Profile | any;
  imageData: string | any;
  constructor(private authService:AuthserviceService,
    private route:Router
  ) {
    this.ppUser();
    
   }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
    console.log(this.conso);
    this.authService.getuserDetails().subscribe((res)=>{
      console.log(res);
    })
  }
  ppUser(){ 
   return this.conso=localStorage.getItem('user');
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.authService.addProfile(this.form.value.name, this.form.value.image,this.conso);
    this.form.reset();
    this.imageData = null;
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}
  
}
   



