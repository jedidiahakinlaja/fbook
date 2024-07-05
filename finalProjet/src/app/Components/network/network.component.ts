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
  stats:any;
  imageData: string | any;
  imageIdData:any;
  imagesubImage:string|any;
  img:any;
  requestlists:any;
  selected_id:any
  hideUser:any;
  filterlist:any;

  private imageIdSubcription:Subscription;
  constructor(
    private authService:AuthserviceService,
    private route:Router
  ) {

    // this.getSelectid();
     this.getUsername();
    this.authService.getAllUser().pipe(map((response)=>{
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
        this.filterlist= this.requestlists.filter(function(record:any){
          return record.stat=="request pending"
        })
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

     getUsername(){
      this.hideUser = localStorage.getItem('user');
      console.log('hideen',this.hideUser);
      return this.hideUser;
     
    }

     request(receiverId:any){
      this.getUserId();
      console.log(receiverId);
      this.stat="request pending";
      this.img='';
      this.authService.sendRequest(this.senderId,receiverId, this.stat, receiverId);
     }


     acceptRequest(selectid:any){
      this.selected_id=selectid
      localStorage.setItem('selected_id',this.selected_id);
      this.stats="request accepted";
      localStorage.setItem('resendSender',this.filterlist[0].senderId)
      let request:any={
        stat:this.stats
      }

      this.authService.friendRequested(this.selected_id, request);
     }

     

    //  getSelectid(){
    //   return this.selected_id=localStorage.getItem('selected_id');
    //  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}

}
