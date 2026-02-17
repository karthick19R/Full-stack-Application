import { api } from "./api";
import { jwtDecode } from "jwt-decode"
import { useUserDetails } from '@/stores/score'
import Cookies from 'js-cookie'
export async function getusers(){
    const token = Cookies.get('token')
    console.log("Going to run getusers function to fetch all users")
    const res = await api.get('/users',{headers:{
            Authorization : `Bearer ${token}`
        },withCredentials:true})
    console.log("result catched in getusers of apiservice",res)
    return res
}
export async function loginUser(credentials){
    console.log("Inside login")
    return await api.post('/login',credentials,{
        
        withCredentials:true
    })
}
export async function currentUser(){
    const token = Cookies.get('jwt')
    console.log("Inside current user function : token :",token)
    return await api.get('/user',{
        headers:{
            Authorization : `Bearer ${token}`
        },
        withCredentials:true
    })
}
export async function signup(data){
    console.log(data)
    console.log("Inside Signup function")
    return await api.post('/user',data,{
        withCredentials:true
    })
}
export function jwtPayload(){
    const token = Cookies.get("jwt")
if (token) {
  const decoded = jwtDecode(token)
  console.log(decoded)
}}
export function LogOut(){
  Cookies.remove('token', { path: '/' }) 
  const store = useUserDetails()
  store.currentuser.data = null
   console.log(Cookies.get("token"))
}
 ///////////// chat api ///////
 export async function getAllchats(){
    const OAT_token = Cookies.get('oat')
    const res = await api.get('/post',{
        headers:{
             Authorization : `Bearer ${OAT_token}`
        }
    })
    return res
 }
 export async function getPersonalChat(id){
    const OAT_token = Cookies.get('oat')
    console.log("  user details function : token :",OAT_token)
    return await api.get(`/posts/userid/${id}`,{
        headers:{
            Authorization : `Bearer ${OAT_token}`
        },
        withCredentials:true
    })
 }
 export async function addMessage(payload){
    const OAT_token = Cookies.get('oat')
    console.log("  user details function : payload :",payload)
    return await api.post('/post', payload, {
         headers:{
            Authorization : `Bearer ${OAT_token}`
        },
            withCredentials: true
             })
 }