import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authservice:AuthserviceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
     const token =this.authservice.getToken();
     if(!token){
      return next.handle(request); 
     }
     const authRequest = request.clone({
      headers:request.headers.set("authorization",token)
     })
     return next.handle(authRequest);
  }
}
