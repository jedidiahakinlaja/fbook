import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/_service/authModel';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  conso: string | any
  form!: FormGroup 
  profile: Profile | any;
  imageData: string | any;
  selectedFile: File | null = null;
  imageIdData:any;
  imagesubImage:string|any;
  private imageIdSubcription:Subscription;
  user:string| any;

  constructor(private authService:AuthserviceService,
    private route:Router
  ) {
     this.authService.getuserDetails().subscribe((res)=>{
      this.user=res;
      console.log();
    })
       this.authService.getUserbyId();
      this.imageIdSubcription=this.authService.getUserIdStream().subscribe((res)=>{
      console.log(res);
      this.imageIdData=res;
      this.imagesubImage=this.imageIdData.image
      console.log(this.imagesubImage)
    })
     

   }

  ngOnInit(): void {
    // console.log(this.conso);
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
         })
     }

     ngOnDestroy(){
      this.imageIdSubcription.unsubscribe();
     }

  ppUser(){ 
   return this.conso=localStorage.getItem('user');
  }

  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      this.authService.uploadImage(this.selectedFile).subscribe(
        response => console.log('Upload successful', response),
        error => console.error('Upload error', error)
      );
    }
     }


  postUpload():void{
    if(this.selectedFile){
      this.authService.uploadPostImage(this.selectedFile).subscribe(
        response => console.log('Upload successful', response),
        error => console.error('Upload error', error)
      );
    }
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
   



