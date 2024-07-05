import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, map } from 'rxjs';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friendlist:any

  filterFriendlist:any;

  constructor(private authService:AuthserviceService, private route:Router) { }

  ngOnInit(): void {

    this.authService.getFriend().subscribe((res)=>{
      console.log(res);
        this.friendlist = res

        this.filterFriendlist= this.friendlist.filter(function(record:any){
          return record.stat = "request accepted";
        })
    })
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }

}
