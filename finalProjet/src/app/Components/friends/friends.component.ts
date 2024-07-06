import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

  friendlist:any

  filterFriendlist:any;

  imageData: string | any;
  imageIdData:any;
  imagesubImage:string|any;
  img:any;
  user:string| any;
  postfromfriend:any; 
  postfromfriendfilter:any;
  role:any;
  private imageIdSubcription:any;

  constructor(private authService:AuthserviceService, private route:Router) { }
 

  ngOnInit(): void {
    this.role=localStorage.getItem('role');
    this.authService.getFriend().subscribe((res)=>{
      console.log(res);
        this.friendlist = res

        this.filterFriendlist= this.friendlist.filter(function(record:any){
          return record.stat = "request accepted";
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

  ngOnDestroy(){
    this.imageIdSubcription.unsubscribe();
   }

 

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }

}
