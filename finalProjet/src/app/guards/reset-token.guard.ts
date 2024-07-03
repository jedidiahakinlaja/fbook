import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../_service/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class ResetTokenGuard implements CanActivate {

  constructor(private authService:AuthserviceService,private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.authService.isresetToken()){
        return true;
      }
       
        window.alert('please login first from can!!');
        localStorage.removeItem('resetToken');
        this.router.navigate(['login']);
        return false;
      
  }
  
}
