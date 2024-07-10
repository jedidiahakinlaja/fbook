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
  role:any;
  connection:any;

  private imageIdSubcription:Subscription;
  postfromfriend: any;
  postfromfriendfilter: any;
  networkList: any;
  networks: any;
  constructor(
    private authService:AuthserviceService,
    private route:Router
  ) {

    this.role=localStorage.getItem('role');

    // this.getSelectid();
     this.getUsername();
    this.authService.getAllUser().pipe(map((response)=>{
      return response;
      
    })).subscribe((res)=>{
      this.connection=res;
      })

      
        this.authService.getAllUser().subscribe((res)=>{
            
          this.networkList=res;
          this.networks= Object.keys(this.networkList).length;
          console.log(this.networks);
          })


      this.authService.viewPostfromFriend().subscribe((res)=>{
        this.postfromfriend=res;
        this.postfromfriendfilter= this.postfromfriend.filter(function(result:any){
          return result.stat='request accepted'
        })
          this.connection= Object.keys(this.postfromfriendfilter).length
      })

      this.authService.getuserDetails().subscribe((res)=>{
        this.lists=res;
        this.senderId= this.lists._id
      })


      this.authService.getActionRequest().subscribe((res)=>{
        this.requestlists=res;
        this.filterlist= this.requestlists.filter(function(record:any){
          return record.stat=="request pending"
        })
      })

      this.authService.getUserbyId();
      this.imageIdSubcription=this.authService.getUserIdStream().subscribe((res)=>{
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
       return this.senderId;
     }

     getUsername(){
      this.hideUser = localStorage.getItem('user');
      console.log('hideen',this.hideUser);
      return this.hideUser;
     
    }

     request(receiverId:any, receiver_firstname:any, receievr_lastname:any, receiver_image:any ){
      this.getUserId();
      console.log(receiverId);
      this.stat="request pending";
      this.img='';
      this.authService.sendRequest(this.senderId,receiverId, this.stat, receiverId, receiver_firstname, receievr_lastname, receiver_image);
     }


     acceptRequest(selectid:any){
      this.selected_id=selectid
      localStorage.setItem('selected_id',this.selected_id);
      this.stats="request accepted";
      localStorage.setItem('resendSender',this.filterlist[0].senderId)
      localStorage.setItem('resend_firstname',this.filterlist[0].receiver_firstname)
      localStorage.setItem('resend_lastname',this.filterlist[0].receiver_lastname)
      localStorage.setItem('resend_image',this.filterlist[0].receiver_image)
      let request:any={
        stat:this.stats
      }

      this.authService.friendRequested(this.selected_id, request);
      location.reload();
     }

     

    //  getSelectid(){
    //   return this.selected_id=localStorage.getItem('selected_id');
    //  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}

}
