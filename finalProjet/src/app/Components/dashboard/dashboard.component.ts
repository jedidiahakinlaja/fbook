import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
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
  postfromfriend:any; 
  postfromfriendfilter:any;
  role:any;
  requestlists: any;
  filterlist: any;
  connection:any;
  network: any;
  networkList:any

  constructor(private authService:AuthserviceService,
    private route:Router
  ) { 
     this.role=localStorage.getItem('role');
     this.authService.getuserDetails().subscribe((res)=>{
      this.user=res;
      console.log(res);
    })


    this.authService.getAllUser().subscribe((res)=>{
     
      this.networkList=res;
      this.network= Object.keys(this.networkList).length;
      console.log(this.network);
      })

    this.authService.viewPostfromFriend().subscribe((res)=>{
      this.postfromfriend=res;
      this.postfromfriendfilter= this.postfromfriend.filter(function(result:any){
        return result.stat='request accepted'
      })
        this.connection= Object.keys(this.postfromfriendfilter).length
    })
       this.authService.getUserbyId();
      this.imageIdSubcription=this.authService.getUserIdStream().subscribe((res)=>{
      this.imageIdData=res;
      this.imagesubImage=this.imageIdData.image;
    })
     
    this.authService.getActionRequest().subscribe((res)=>{
      console.log(res);
      this.requestlists=res;
      this.filterlist= this.requestlists.filter(function(record:any){
        return record.stat=="request pending"
      })
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
      location.reload();
     }


  postUpload():void{
    if(this.selectedFile){
      this.authService.uploadPostImage(this.selectedFile).subscribe(
        response => console.log('Upload successful', response),
        error => console.error('Upload error', error)
      );
    }
    location.reload();
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
   



