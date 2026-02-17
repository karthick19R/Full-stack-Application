<script setup>

const credentials = defineModel()
const emit = defineEmits(['login'])
//variant: "elevated" | "flat" | "outlined" | "plain" | "text" | "tonal"

</script>
<template>
  <div class="login-form">
    <v-form @submit.prevent="emit('login')">
      <v-text-field
        label="Email"
        v-model="credentials.email"
        variant="outlined"
        class="mb-4"
      />

      <v-text-field
        label="Password"
        type="password"
        v-model="credentials.password"
        variant="outlined"
        class="mb-4"
      />

      <div class="login-actions">
        <v-btn color="primary" size="small" type="submit">Login</v-btn>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.mb-4 { margin-bottom: 16px; }
.login-form { margin-top: 12px; }
.login-actions { display:flex; justify-content:center; }
</style>