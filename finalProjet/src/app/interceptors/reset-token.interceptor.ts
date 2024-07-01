import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthserviceService } from '../_service/authservice.service';
import { Router } from '@angular/router';

@Injectable()
export class ResetTokenInterceptor implements HttpInterceptor {

  constructor(private authService:AuthserviceService, 
    private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myresetToken =this.authService.getResetToken()

    if(myresetToken){
      request = request.clone({
        setHeaders:{Authorization:`Bearer ${myresetToken}`}
      })
    }

    return next.handle(request).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
            this.router.navigate(['login'])
            window.alert('token expired login again')
          }
        }
        return throwError(()=>new Error("some other error occurred"))
      })
    );  }
}
