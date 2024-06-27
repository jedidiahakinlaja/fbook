export interface AuthModel{
    firstname:string,
    lastname:string,
    username:string,
    password:string,
    email:string,
    dob:Date,
    image:string
}

export interface AuthModel2{
    username:string,
    password:string
}
export interface AuthModel3{
    username:string
}
export interface AuthModel4{
id: any;
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
export interface RequestModel{
    senderId:string,
    receiverId:string,
    stat:string,
    img:string
}
