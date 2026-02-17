<script setup>
import { computed, reactive, ref } from 'vue'
// import vCapitalize from '../custom/directive.js'
import { counter } from '@/custom/composable.js'

const value= defineModel()
const emit = defineEmits(['submit'])
const signtry = counter()
const signsuccess = counter()
const errors = reactive({})
const vFocus = {
  mounted(el){
    el.focus()
  }
}
function validate() {
    Object.keys(errors).forEach(key => delete errors[key])
  if (value.value.firstname == "" ) {
    errors.firstname = "First Name  is required"
  }
  if (!value.value.lastname) {
    errors.lastname = "lastname is required"
  }
  if (value.value.role == "") {
    errors.role = "Please select role"
  }
  if (value.value.gender == "") {
    errors.gender = "Please select gender"
  } if (!value.value.email) {
    errors.email = "Email is required"
  }
  if (!value.value.phonenumber) {
    errors.phonenumber = "Phone number is required"
  } 
  if (!value.value.password) {
    errors.password = "Password is required"
    if (!value.value.repassword) {
      errors.repassword = "Retype your password"
    }
  } 
  if (value.value.password !== value.value.repassword) {
    errors.repassword = "Passwords do not match"
  }

}
function resetform() {
  value.value.firstname = ""
  value.value.lastname = ""
  value.value.gender = ""
  value.value.role=""
  value.value.email = ""
  value.value.phonenumber = ""
  value.value.password = ""
  value.value.repassword = ""
  Object.keys(errors).forEach(key => delete errors[key])
}
// function congrat(){
//   window.alert("User Created Successfully")
// }
function submitform() {
 // console.log(user)
  signtry.increment();
  // if (Object.keys(validationError.value).length > 0) {
  //   return
  // }
  validate() 
  console.log(errors)
  if (Object.keys(errors).length > 0) {
    return
  }
  signsuccess.increment()
  emit('submit',value.value)
  resetform()
}
</script>

<template>
  <v-container class="d-flex align-center justify-center py-8">
    <v-card elevation="2">
      <v-card-text class="pa-6">
        <v-form @submit.prevent="submitform">
          <v-text-field
            v-capitalize
            v-focus
            label="First Name"
            v-model="value.firstname"
            :error-messages="errors.firstname"
            variant="outlined"
            class="mb-4"
          />

          <v-text-field
            label="Last Name"
            v-model="value.lastname"
            v-capitalize
            :error-messages="errors.lastname"
            variant="outlined"
            class="mb-4"
          />

          <v-radio-group
            label="Gender"
            v-model="value.gender"
            :error-messages="errors.gender"
            color="primary"
            inline
            class="mb-4"
          >
            <v-radio label="Male" value="male"></v-radio>
            <v-radio label="Female" value="female"></v-radio>
          </v-radio-group>

          <v-select
            v-model="value.role"
            :items="['admin', 'user']"
            label="Your Role"
            variant="outlined"
            :error-messages="errors.role"
            class="mb-4"
          />

          <v-text-field
            label="Phone Number"
            v-model="value.phonenumber"
            :error-messages="errors.phonenumber"
            variant="outlined"
            class="mb-4"
          />

          <v-text-field
            label="Email"
            type="email"
            v-model="value.email"
            :error-messages="errors.email"
            variant="outlined"
            class="mb-4"
          />

          <v-text-field
            label="Password"
            type="password"
            v-model="value.password"
            :error-messages="errors.password"
            variant="outlined"
            class="mb-4"
          />

          <v-text-field
            label="Confirm Password"
            type="password"
            v-model="value.repassword"
            :error-messages="errors.repassword"
            variant="outlined"
            class="mb-6"
          />

          <div class="button-row">
            <v-btn color="primary" size="small" type="submit">
              Submit
            </v-btn>
            <v-btn color="error" size="small" @click="resetform">
              Reset
            </v-btn>
          </div>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-center pa-4 text-caption text-grey">
        <p class="mb-0">No of Attempts: {{ signtry.count }} </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.mb-6 {
  margin-bottom: 24px;
}

.py-8 {
  padding-top: 32px;
  padding-bottom: 32px;
}

.button-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 2px;
}

.button-row .v-btn {
  min-width: 100px;
}
</style>