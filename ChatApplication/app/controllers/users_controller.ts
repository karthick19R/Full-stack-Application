import { HttpContext } from '@adonisjs/core/http'
import { signupvalidator, checkid, updateuserValidator, checkemail ,userValidatorLogin } from '../validators/user.js'
import UserDomain from '../domains/user_domain.js'
import UserRepository from '../repositories/user_repository.js';
import User from '#models/user';
import { Exception } from '@adonisjs/core/exceptions';
   interface userData {
    id : number,
    email :string,
    fullName : string,
    role :'admin'|'user',
    gender :'male'|'female'
    phoneNumber:string
  }

export default class UsersController {
  private userDomain : UserDomain;
  private userRepo : UserRepository
  constructor(){
    this.userDomain = new UserDomain()
    this.userRepo = new UserRepository()

  }
 
  public async getdetail(ctx: HttpContext) {
      //console.log("Inside user controller getdetail"); 
      const validId = await checkid.validate({id : ctx.userid})
      const data : User = await this.userRepo.getdetail(validId.id)
      const result:userData = await this.userDomain.getDetail(data).catch(()=>{
        throw new Exception("Invalid User data",{status:400})
      })
      return {  
        success : true,
        data : result 
      }
  }

   public async updateuser(ctx: HttpContext) {
      //console.log("Inside user update")
      const validId= await checkid.validate({id:ctx.userid})
      const validData = await ctx.request.validateUsing(updateuserValidator)
      const data:User = await this.userRepo.updateuser(validId.id,validData)
      const result:userData = await this.userDomain.updateUser(data)
      return {
        success : true,
        status : "user data updated successfully",
        data : result
      }
  }

  public async createuser({ request }: HttpContext) {
      const validatedData:{fullName : string,email : string ,password :string, role :'admin'|'user',
    gender :'male'|'female',phoneNumber:string} = await request.validateUsing(signupvalidator)
      const userdata:User = await this.userRepo.createUser(validatedData)
      const user:userData = await this.userDomain.createUser(userdata).catch(()=>{
        throw "Error while creating user"
      })
      return {
        success: true,
        message: 'User created successfully',
        data: user,
      }
  }

  public async deleteUser(ctx: HttpContext) {
      const validId = await checkid.validate({id :ctx.userid})
      const del : boolean= await this.userRepo.deleteUser(validId.id)
      const result = this.userDomain.deleteuser(del)
      return {
        success : result,
        message: 'User deleted successfully',
      }
  }
  public async getUserByEmail({ params}: HttpContext) {
      const validData = await checkemail.validate(params)
      const userdata:User = await this.userRepo.getUserByEmail(validData.email)
      const data = await this.userDomain.getUserByEmail(userdata).catch(()=>{
        throw new Exception("User Data is Invalid",{status : 400})
      })
      return {
        success : true,
        data
      }
  }
  public async login({ request,response }: HttpContext) {
      const data :{email : string, password :string}= await request.validateUsing(userValidatorLogin)
      const usertoken = await this.userRepo.login(data.email,data.password)
      const res = await this.userDomain.login(usertoken)
      console.log("JWT being stored:", res.jwtToken)
//       response.cookie('token',res.jwtToken,{
// })
      console.log(res)
      return {
        success : true ,
        message : "User login successful",
        data:res
      }
  }

  public async getallusers({ }: HttpContext) {
      const users : userData[] = await this.userRepo.getallusers()
      const res : userData[] = await this.userDomain.getallusers(users)
      console.log(res)
      return {
        success : true ,
        message : "All users Data Fetched",
        data:res
      }
  }
  public async getspecificuser({params}:HttpContext){
  const validatedata:{id :number} = await checkid.validate(params)
  const user:User= await this.userRepo.getspecificuser(validatedata.id).catch(()=>{
        throw new Exception("Error while fetching specific user data",{status:400})
      })
  }
}
