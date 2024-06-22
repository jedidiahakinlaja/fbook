import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/_service/authservice.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private authService:AuthserviceService, private route:Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }

}
