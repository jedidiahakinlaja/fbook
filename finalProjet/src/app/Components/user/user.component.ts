import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../../_service/authservice.service';
import { map } from 'rxjs';
import { AuthModel, AuthModel3, AuthModel4 } from 'src/app/_service/authModel';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users:any;
  user:any;
  cal:AuthModel4[]=[];
  final:any;
  products:any;
  role:any;
  constructor( private authService:AuthserviceService) { 

    this.role=localStorage.getItem('role');
  }



  ngOnInit(): void {
    this.authService.getAllUser().pipe(map((response)=>{
      console.log(response);
      return response;
      
    })).subscribe((res)=>{
      this.cal=res;
      console.log(this.cal);
      })
    
   
     }

     logout(){
      this.authService.logout
     }

    
  
  }
