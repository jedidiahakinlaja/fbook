import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../_service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthserviceService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
 
        const role= localStorage.getItem('role')
        console.log(role);
      if(this.authService.isLogeddIn() && role=='admin'){
        return true;
      }
        window.alert('you are not unauthorized!!');
        this.router.navigate(['login']);
        this.authService.logout();
        return false;
      
  }
  
}
