import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AuthModel4 } from 'src/app/_service/authModel';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, OnDestroy  {
  network:any;
  id: any;
  lists: any;
  senderId:any;
  stat:any;
  imageData: string | any;
  imageIdData:any;
  imagesubImage:string|any;
  img:any;
  requestlists:any;
  selected_id:any

  private imageIdSubcription:Subscription;
  constructor(
    private authService:AuthserviceService,
    private route:Router
  ) {

    this.authService.getAllUser().pipe(map((response)=>{
      console.log(response);
      return response;
      
    })).subscribe((res)=>{
      this.network=res;
      console.log(this.network);
      })

      this.authService.getuserDetails().subscribe((res)=>{
        console.log(res);
        this.lists=res;
        this.senderId= this.lists._id
      })


      this.authService.getActionRequest().subscribe((res)=>{
        console.log(res);
        this.requestlists=res;
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
   

     }

     ngOnDestroy(){
      this.imageIdSubcription.unsubscribe();
     }
     
     getUserId(){
       this.senderId= localStorage.getItem('senderId');
       console.log('hello world');
       return this.senderId;
     }

     request(receiverId:any){
      this.getUserId();
      console.log(receiverId);
      this.stat="request pending";
      this.img='';
      this.authService.sendRequest(this.senderId,receiverId, this.stat, this.senderId);
     }


     acceptRequest(id:any){
      this.selected_id=id
      localStorage.setItem('selected_id',this.selected_id);
      this.stat="request accepted";
      this.authService.friendRequested(this.stat);
     }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}

}
