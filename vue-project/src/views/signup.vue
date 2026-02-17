<script setup>
import { reactive, ref } from 'vue'
import { useUserDetails } from '@/stores/score'
import signupComponent from '@/components/signupComponent.vue'
import dialoguebox from '@/components/dialoguebox.vue'
const userstore = useUserDetails()
const user = reactive({
  firstname: "",
  lastname: "",
  gender: "",
  email: "",
  role: "",
  phonenumber: "",
  password: "",
  repassword: ""
})
// const errordialoguebox =ref(false)
// const errordialogue = ref()
const showdialoguebox = ref(false)
const uservalue = ref()
function submitform(data) {
  console.log("data : ",data)
  showdialoguebox.value=true
  Object.assign(uservalue, {
    username: `${data.firstname} ${data.lastname}`,
    gender: data.gender,
    email: data.email,
    role: data.role,
    phonenumber: data.phonenumber,
    password: data.password
  })
  
}

async function confirmcreate() {
  showdialoguebox.value=true
  console.log("user value before sending",uservalue)
  userstore.addUser(uservalue)
  // console.log(result)
}
  //userstore.addUser(uservalue)

</script>

<template>
  <div class="signup-wrapper">
    <v-card width="420" elevation="4" class="pa-4">

      <v-card-title class="text-center text-h6 bg-primary text-white py-4">
        Sign Up
      </v-card-title>

      <v-card-text class="pa-6">
        <signupComponent
          v-model="user"
          @submit="submitform"
        />
      </v-card-text>

      <v-divider />

      <v-card-text class="text-center pa-4">
        <p class="text-caption text-grey mb-3">
          Already have an account?
        </p>

        <router-link to="/login" style="text-decoration: none;">
          <v-btn variant="text" color="primary">
            Login Here
          </v-btn>
        </router-link>
      </v-card-text>

    </v-card>

    <dialoguebox v-model="showdialoguebox" @yes="confirmcreate">
      <template #title>
        Confirm User Creation
      </template>
      <template #message>
        Are you sure you want to create this user account?
      </template>
    </dialoguebox>
  </div>
</template>

<style scoped>
.signup-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.signup-card {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.mb-3 {
  margin-bottom: 12px;
}
</style>
