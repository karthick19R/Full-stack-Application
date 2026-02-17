import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { signup,currentUser ,loginUser,jwtPayload,LogOut} from '@/service/userapi'
import { useRouter } from 'vue-router'
const router = useRouter()
export const useUserDetails = defineStore("user", () => {
  const currentuser = reactive({
    data: {},
  });
  const id = ref(2);
  const users = reactive([
    {
      id: 1,
      username: "karthick",
      email: "karthick@example.com",
      gender: "male",
      role: "Admin",
      phonenumber: "9876543211",
      password: "karthick@example.com",
    },
  ]);
const errordialogue = ref()
async function login(credentials){
  console.log("Inside login function")
  const result = await loginUser({ email: credentials.email, password: credentials.password }).catch((error) => {
    console.log("Error in login catch",error.response.data)
        if (error.response.data.message === "Invalid Credentials") {
            console.log("errors in login user",error.response.data.message) // error.response.data.errors to get errors
            errordialogue.value=error.response.data.message
            alert(errordialogue.value)
            return null
            }
            else{
                console.log("Else part error in hanfle login of login function")
                return null
            }
                })
      return result
 }
  async function addUser(uservalue) {
    console.log(uservalue, "Checking store");
    const result = await signup({
      email: uservalue.email,
      gender: uservalue.gender,
      password: uservalue.password,
      phoneNumber: uservalue.phonenumber,
      role: uservalue.role,
      fullName: uservalue.username,
    }).catch((error) => {
      console.log("errors in signup user", error.response.data); // error.response.data.errors to get errors
      // console.log(error.response.data.errors[0])
      errordialogue.value = error.response.data.errors[0];
      alert(errordialogue.value)
    });
    // users.push({id:id.value++ ,email:data.email,
    //           gender: data.gender,
    //           password: data.password,
    //           phonenumber:data.phonenumber,
    //           role: data.role,
    //           username:data.username
    //           })
    console.log("users", users);
  }

  function removeUser(index) {
    users.splice(index, 1);
  }
  async function loggeduser() {
    // Object.assign(currentuser,data)
    const user = await currentUser();
    console.log(user)
    currentuser.data = user.data.data;
    console.log("Current user data logged", currentuser);
    console.log("Current user ", currentuser.data);
    // console.log(currentuser)
  }
   function updateUser(id, updatedData) {
    const user =  users.find((u) => u.id === id);
    if (user) {
      Object.assign(user, updatedData);
    }
  }
  function jwtpayload(){
    jwtPayload()
  }
  function logOut(){
    LogOut()
    alert("logout successfully")
    router.push('/login')
  // Cookies.remove('token')  
  // store.currentuser.data = null
  // console.log
  }
  return { users, addUser,login,removeUser, loggeduser, currentuser,jwtpayload, logOut,updateUser };
});
