import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/_service/authservice.service';

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
  ) { } 

  ngOnInit(): void {
    this.authService.getuserDetails().subscribe((res)=>{
      console.log(res);
      this.lists=res;
    })
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
}

}
