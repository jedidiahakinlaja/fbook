import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { AuthModel, AuthModel2, AuthModel3, AuthModel4,Profile, RequestModel} from './authModel';
import { map,Observable,Subject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private token!: string;
  private authenticationSub = new Subject<boolean>();
  private isAuthenticated =false;
  user:string | any;
  user_id:string |any;
  conso: string | any;
  detail: any;
  selected_id:any;
  private profiles: Profile[] = [];
  private profiles$ = new Subject<Profile[]>();
  private imageId :any;
  private imageId$ = new Subject<Profile[]>();

  readonly url = "http://localhost:5500/uploads";
  getToken(){
    return this.token
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
    private route:Router
  ) { 
     this.getuserDetails();
     this.getusr();
     this.getimgid();
    //  this.getSelected_id();
  }

    registerUser(firstname:string, lastname:string, username:string, password:string, email:string, dob:Date, image:string ){
      const authModel:AuthModel={
        firstname: firstname,
        lastname: lastname,
        username:username,
        password: password,
        email: email,
        dob:dob,
        image:image
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

    // getSelected_id(){
    //   return this.selected_id=localStorage.getItem('senderId');
    //  }

    // friendRequested(stat:string){
    //   this.http.put<any>('http://localhost:5500/checkfriendrequest/'+this.selected_id, stat)
    // }


    loginUser(username:string,password:string){
        const authData:AuthModel2={username:username,password:password}
        this.http.post<any>('http://localhost:5500/login',authData).subscribe(res=>{
          this.token=res.token
          this.user=res.username
          this.user_id=res.userId
          console.log(res);
          if(this.token){
            this.authenticationSub.next(true);
            this.isAuthenticated=true;
            this.route.navigate(['dashboard']);
          }
          localStorage.setItem('user',this.user);
          localStorage.setItem('senderId',this.user_id);

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


        logout() {
          // remove user from local storage and set current user to null
          localStorage.removeItem('user');
          localStorage.removeItem('senderId');
      }
  
    
}

