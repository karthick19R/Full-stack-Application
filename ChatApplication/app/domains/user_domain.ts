import User from "#models/user";
import UserRepository from "../repositories/user_repository.js";

 interface userData {
    id : number,
    email :string,
    fullName : string,
    role :'admin'|'user',
    gender :'male'|'female'
    phoneNumber:string
  }
export default class UserDomain{

    userRepo = new UserRepository()
    public async getDetail(user : User){
       // console.log("Inside getdetail of user domain")
       return {id :user.id,email : user.email,fullName : user.fullName,gender:user.gender,phoneNumber:user.phoneNumber,role:user.role}

    }

    public async updateUser(data : User){
        //console.log("Inside user domain updateuser")
        return {
            id :data.id,
            fullName : data.fullName,
            email : data.email,
            gender:data.gender,
            phoneNumber:data.phoneNumber,
            role:data.role
        }
    }
    public async getallusers(users:userData[]){
        console.log(users)
        return users
    }
    public async createUser(data : User){
       return {
            id :data.id,
            fullName : data.fullName,
            email : data.email,
            gender:data.gender,
            phoneNumber:data.phoneNumber,
            role:data.role
        }
    }

    public async deleteuser(flag : boolean){
        return flag
    }

    public async getUserByEmail(user : User){
        return {fullName :user.fullName ,email : user.email,id : user.id}
    }
    public async login(data :{OAT : string , jwtToken : string}){
        return data
    }
    // custom command created to delete old users
    public async deleteInActive(days : number){
        if (days <= 0) {
      throw new Error('Days must be greater than zero')
    }
    return days
    }
}