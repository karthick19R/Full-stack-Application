<script setup>
import { useUserDetails } from '@/stores/score'
import { computed } from 'vue'
import { decodeToken} from '@/utils/auth'
import router from '@/router'
const store = useUserDetails()
store.jwtpayload()

const userId = computed(() => store.currentuser.data.id)
console.log("current user",store.currentuser)
console.log("user id",userId)
console.log("user id",userId.value)
console.log("fullNmae:",store.currentuser.data.fullName)
console.log("email:",store.currentuser.data.email )
// function logout(){
//   store.logOut()
//   Cookies.remove('token')   // remove JWT
//   store.currentuser.data = null
//   console.log()
// }
function application(){
  router.push('/apphome')
}
console.log("Token : ",decodeToken())
// console.log(store.getjwttoken)
</script>

<template>
  <v-container class="py-12 d-flex align-center" style="min-height: 100vh;">
    <v-row justify="center" class="w-100">
      <v-col cols="12" sm="11" md="9" lg="8">
        <v-card class="elevation-4">
          <v-card-item class="bg-primary text-white text-center pa-10">
            <v-avatar size="50" color="white" text-color="primary" class="mb-6">
              {{ store.currentuser.data.username ? store.currentuser.data.username.charAt(0).toUpperCase() : 'U' }}
            </v-avatar>
            <div>
              <h2 class="text-h4 font-weight-bold">{{ store.currentuser.data.fullName }}</h2>
              <p class="text-body1 text-white-70 mt-3">{{ store.currentuser.data.role || user}}</p>
            </div>
          </v-card-item>

          <v-card-text class="pa-10">
            <v-row>
              <v-col cols="12" sm="6" class="mb-6">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="medium" class="mr-4">mdi-email-outline</v-icon>
                  <div>
                    <p class="text-caption text-gray-500 mb-1">Email</p>
                    <p class="text-body2 font-weight-bold">{{ store.currentuser.data.email }}</p>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" sm="6">
                <div class="d-flex align-center">
                  <v-icon color="primary" size="medium" class="mr-4">mdi-phone-outline</v-icon>
                  <div>
                    <p class="text-caption text-gray-500 mb-1">Phone</p>
                    <p class="text-body2 font-weight-bold">{{ store.currentuser.data.phoneNumber }}</p>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="pa-10">
            <v-row class="gap-4">
              <v-col cols="12">
                <v-btn
                  color="primary"
                  :to="`/user/edit/${userId}`"
                  block
                  size="large"
                  class="font-weight-bold"
                >
                  <v-icon start>mdi-pencil</v-icon>
                  Edit Profile
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="success"
                  to="/table"
                  block
                  size="large"
                  class="font-weight-bold"
                >
                  <v-icon start>mdi-table</v-icon>
                  View All Users
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="error"
                  to="/login"
                  block
                  size="large"
                  class="font-weight-bold"
                  @click="application"
                >
                  <v-icon start>mdi-logout</v-icon>
                  Chat Application
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
