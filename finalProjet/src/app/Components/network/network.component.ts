import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthModel4 } from 'src/app/_service/authModel';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  network:any;
  id: any;
  lists: any;
  senderId:any;
  stat:any;
  constructor(
    private authService:AuthserviceService,
    private route:Router
  ) {
   }

  ngOnInit(): void {
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
      this.authService.sendRequest(this.senderId,receiverId, this.stat);
     }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}

}
