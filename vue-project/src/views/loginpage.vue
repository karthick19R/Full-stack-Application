<script setup>
import Logincomponent from '@/components/logincomponent.vue';
import { reactive, ref } from 'vue';
import { useUserDetails } from '@/stores/score'
import { useRouter } from 'vue-router'
const { appContext } = getCurrentInstance()

const router = useRouter()
import dialoguebox from '@/components/dialoguebox.vue'
const showdialoguebox = ref(false)
import { getCurrentInstance } from 'vue'
const cookies = appContext.config.globalProperties.$cookies
// import Cookies from 'js-cookie';
const userstore = useUserDetails()
const errordialoguebox =ref(false)
const errordialogue = ref()
const credentials = reactive({
    'email': '',
    'password': ''
})
const result =ref({})
async function handlelogin() {
     result.value = await userstore.login(credentials)
    // console.log(result)
    // if (!result.data.success) return alert("Invalid Credentrials")
    // console.log(userstore.users)
    // console.log(credentials)
    // result.value = userstore.users.find((user)=>user.email===credentials.email)
    // console.log("result",result.value)
    // console.log("user not found")
    // if(!result.value) return alert("User Not Found")
    // console.log("credentials")
    // if(result.value.password !== credentials.password) return alert("Invalid Credentials")
    // console.log("Inside login",result.value)

    //setting cookie
    //console.log("result.value : ",result.value.data.data.jwtToken)
    if(result.value.data.success){
      // cookies.set('token', result.value.data.data.jwtToken)
      cookies.set('jwt', result.value.data.data.jwtToken, {
        expires: 1,
        path: '/',
        sameSite: 'strict'
      })

      // Set OAT
      cookies.set('oat', result.value.data.data.OAT, {
        expires: 1,
        path: '/',
        sameSite: 'strict'
      })
    //  Cookies.set('token',result.data.jwtToken)
     showdialoguebox.value = true
    }

}
async function confirmcreate() {
    //const user = await currentuser()

    // console.log("user.data", user.data)
    // console.log("user.data.data", user.data.data)
    await userstore.loggeduser()
    console.log("going to push to home")
    router.push('/home')
}
//  function errorfunction(){
//     errordialoguebox.value = false
//   }
</script>
<template>
  <div class="login-wrapper">
    <v-card width="420" elevation="4" class="pa-4">
      
      <v-card-title class="text-center text-h6 bg-primary text-white py-4">
        Login
      </v-card-title>

      <v-card-text class="pa-6">
        <Logincomponent v-model="credentials" @login="handlelogin" />

        <dialoguebox v-model="showdialoguebox" @yes="confirmcreate">
          <template #title>
            Confirm User Login
          </template>
          <template #message>
            Welcome! Shall we proceed?
          </template>
        </dialoguebox>
      </v-card-text>

      <v-divider />

      <v-card-text class="text-center pa-4">
        <p class="text-caption text-grey mb-3">
          Don't have an account?
        </p>

        <router-link to="/signup" style="text-decoration:none;">
          <v-btn variant="text" color="primary">
            Create an account
          </v-btn>
        </router-link>
      </v-card-text>

    </v-card>
  </div>
</template>



<style scoped>
.login-page {
    min-height: 100vh;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}

.min-height-100vh {
    min-height: 100vh;
}

.login-card {
    border-radius: 8px;
}
.login-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>