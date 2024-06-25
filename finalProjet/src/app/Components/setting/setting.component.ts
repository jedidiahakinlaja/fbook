import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/_service/authservice.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
lists: any;

  constructor(
    private authService:AuthserviceService,
    private route:Router
  ) { 
   
  } 

  ngOnInit(): void {
    this.authService.getuserDetails().pipe(map((response)=>{
      console.log(response);
      return response;
      
    })).subscribe((res)=>{
      this.lists=res;
      console.log(this.lists);
      })
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}

}
