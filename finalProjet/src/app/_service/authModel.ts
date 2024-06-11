export interface AuthModel{
    firstname:string,
    lastname:string,
    username:string,
    password:string,
    email:string,
    dob:Date
}

export interface AuthModel2{
    username:string,
    password:string
}
export interface AuthModel3{
    username:string
}
export interface AuthModel4{
    firstname:string,
    lastname:string,
    username:string,
    password:string,
    email:string
}
export interface Profile {
    _id: string;
    name: string;
    imagePath: string;
    username:string;
  }