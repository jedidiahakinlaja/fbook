import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthModel, AuthModel2, AuthModel3, AuthModel4,Profile, RequestModel, selectModel} from './authModel';
import { BehaviorSubject, map,Observable,Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Conditional } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  token: string | any;
  resetToken: string | any;
  resetTokensent : string | any;
  resetId :string | any;
  private authenticationSub = new Subject<boolean>();
  private isAuthenticated =false;
  private ResetTokenObj = new Subject<boolean>();
  private isResetTokenSub = false;

  user:string | any;
  user_id:string |any;
  conso: string | any;
  detail: any;
  selected_id:any;
  lastId:any;
  edit_id:any;
  private profiles: Profile[] = [];
  private profiles$ = new Subject<Profile[]>();
  private imageId :any;
  private imageId$ = new Subject<Profile[]>();
  readonly url = "http://localhost:5500/uploads";

  setResetToken(){
    return this.isResetTokenSub;
  } 

  getResetTokenObj(){
    return this.ResetTokenObj.asObservable();
  }

  getAuthenticatedSub(){
    return this.authenticationSub.asObservable();
  }
  getIsAuthenticated(){
    {
      return this.isAuthenticated;
    }
  }
  constructor(
    private http:HttpClient,
    private route:Router,
    private jwtHelper: JwtHelperService
  ) { 
     this.getuserDetails();
     this.getusr();
     this.getimgid();
     this.getSelected_id();
     this.getEditId();
     this.getToken();
     this.getResetToken();
     this.getResetId();

  }


    registerUser(firstname:string, lastname:string, username:string, password:string, email:string, dob:Date, image:string, imagePost:string ){
      const authModel:AuthModel={
        firstname: firstname,
        lastname: lastname,
        username:username,
        password: password,
        email: email,
        dob:dob,
        image:image,
        imagePost:imagePost
      }
        this.http.post('http://localhost:5500/register',authModel).subscribe(res=>{
          console.log(res);
        })
    }

    getusr(){
      return this.user=localStorage.getItem('user');
    }
    getimgid(){
      return this.user_id=localStorage.getItem('senderId');
    }
   


    //  Send friend request

    sendRequest(senderId:string, receiverId:string, stat:string, img:string){
      const requestModel:RequestModel={
        senderId:senderId,
        receiverId:receiverId,
        stat:stat,
        img:img
      }

      this.http.post('http://localhost:5500/friendrequest',requestModel).subscribe(res=>{
        console.log(res);
      })
    }

    





    getFriend():Observable<any>{
      return this.http.get<any>('http://localhost:5500/friend/'+this.user_id)
    }
    


    loginUser(username:string,password:string){
        const authData:AuthModel2={username:username,password:password}
        this.http.post<any>('http://localhost:5500/login',authData).subscribe(res=>{
          this.token=res.token,
          this.user=res.username,
          this.user_id=res.userId

          localStorage.setItem('user',this.user);
          localStorage.setItem('senderId',this.user_id);
          localStorage.setItem('token',this.token);

          if(this.token){
            this.authenticationSub.next(true);
            this.isAuthenticated=true;
            this.route.navigate(['dashboard']);
            this.isLogeddIn();
          }
         
        })
        
    } 

    isLogeddIn():boolean{
      return !!localStorage.getItem('token');
    }
  
    getToken(){ 
      return localStorage.getItem('token');   
    }

    forgetUserPassword(password:any){
      return this.http.post<any>('http://localhost:5500/forgetpassword', password)
      .subscribe(
        res=>{
          this.resetToken = res.resetToken,
          this.resetId= res.resetId

          localStorage.setItem('resetId',this.resetId);
          localStorage.setItem('resetToken', this.resetToken);
          if (this.resetToken) {
            this.route.navigate(['resetpassword']);
            this.isresetToken();    
            this.ResetTokenObj.next(true);
            this.isResetTokenSub=true;
          };
        },

        error=>{
          console.error('reset Token', error);
          return throwError({ status: 401 });
        }
      ) 

        
    }
      

    isresetToken():boolean{
      const resetToken = localStorage.getItem('resetToken');
      return !this.jwtHelper.isTokenExpired(resetToken);
    }


  
    getResetToken(){ 
      console.log(this.resetTokensent);
       const resetTokensent =localStorage.getItem('resetToken'); 
      return resetTokensent  
    }
   
    getResetId(){
      return this.resetId=localStorage.getItem('resetId')
    }




    // Change password

    changePassword(changep:any){
      console.log(changep);
      return this.http.patch<any>('http://localhost:5500/userchange/'+this.resetId,changep).subscribe((res)=>{
        console.log(res);
       })

    }



    getuserDetails():Observable<any>{
      console.log(this.user);
      return this.http.get<any>(`http://localhost:5500/users/${this.user}`);
      
    }

    getAllUser():Observable<AuthModel4[]>{
      return this.http.get<AuthModel4[]>('http://localhost:5500/user');
    }

    getUser():Observable<any>{
      return this.http.post<any>('http://localhost:5500/users',this.user);
    
   }

  getActionRequest():Observable<any>{
    return this.http.get<any>('http://localhost:5500/checkfriendrequest/'+this.user_id)
  }

  getUserbyId(){
    return this.http.get<any>('http://localhost:5500/user/'+this.user_id)
    .pipe(
      map((res) => {
        return res
      })
    )
    .subscribe((res) => {
      this.imageId = res;
      this.imageId$.next(this.imageId);
    });
  }

  getUserIdStream(){
    return this.imageId$.asObservable();
  }

    getProfiles() {
      this.http
        .get<{ profiles: Profile[] }>(this.url)
        .pipe(
          map((profileData) => {
            return profileData.profiles;
          })
        )
        .subscribe((profiles) => {
          this.profiles = profiles;
          this.profiles$.next(this.profiles);
        });
    }
  
    getProfilesStream() {
      return this.profiles$.asObservable();
    }
  
    addProfile(name: string, image: File, username:string): void {
      const profileData = new FormData();
      profileData.append("name", name);
      profileData.append("image", image, name);
      profileData.append("username",username);
      this.http
        .post<{ profile: Profile }>(this.url, profileData)
        .subscribe((profileData) => {
          const profile: Profile = {
            _id: profileData.profile._id,
            name: name,
            imagePath: profileData.profile.imagePath,
            username:username
          };
          this.profiles.push(profile);
          this.profiles$.next(this.profiles);
        });
    }

    uploadImage(image: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('image', image, image.name);
      console.log(this.user_id);
      
      return this.http.put('http://localhost:5500/user/'+this.user_id, formData);
    }

    uploadPostImage(image: File):Observable<any>{
      const formData: FormData = new FormData();
      formData.append('image', image, image.name);
      return this.http.patch<any>('http://localhost:5500/imagepost/'+this.user_id, formData);
    }

    getSelected_id(){
      console.log(this.selected_id);
      return this.selected_id=localStorage.getItem('selected_id');
     }



      /// accept friend Request

     friendRequested(send:any, stat:any){
      window.alert(send);
      this.http.patch<any>('http://localhost:5500/friend/'+send, stat).subscribe(res=>{
        this.reacceptedRequest(); 
        console.log(res);
      })
      
    }


    reacceptedRequest(){
      window.alert("reaccapt was called")
     const requestModel:any={
      senderId:this.user_id,
      receiverId:localStorage.getItem('resendSender'),
      stat:"request accepted",
      img:localStorage.getItem('resendSender')
      }
      console.log(requestModel);
      this.http.post('http://localhost:5500/friendrequests',requestModel).subscribe(res=>{
        console.log(res);
      })
      
    }



    getEditId(){
          return  this.edit_id= localStorage.getItem('edit_id');
      }


    editStudent(stud:any){
      console.log(this.edit_id);
      return this.http.patch<any>('http://localhost:5500/user/' +this.edit_id, stud).subscribe((res)=>{
        console.log(res)
      })
    }

    deleteResetToken(){
      return localStorage.removeItem('resetToken');
    }


        logout() {
          // remove user from local storage and set current user to null
          localStorage.removeItem('user');
          localStorage.removeItem('senderId');
          localStorage.removeItem('selected_id');
          localStorage.removeItem('lastId');
          localStorage.removeItem('edit_id');
          localStorage.removeItem('token');
          localStorage.removeItem('resetToken');
          localStorage.removeItem('resetId');
          localStorage.removeItem('resendSender')
          
      }
  
    
}

