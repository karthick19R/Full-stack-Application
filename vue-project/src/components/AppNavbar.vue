<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  const newTheme =
    theme.global.name.value === 'light' ? 'dark' : 'light'

  theme.global.name.value = newTheme
  localStorage.setItem('theme', newTheme)
}
</script>

<template>
  <v-app-bar elevation="2" color="primary">
    <v-app-bar-title>
      My App
    </v-app-bar-title>

    <v-spacer />

    <v-btn icon @click="toggleTheme">
      <v-icon>
        {{ theme.global.name.value === 'light'
          ? 'mdi-weather-night'
          : 'mdi-white-balance-sunny' }}
      </v-icon>
    </v-btn>
  </v-app-bar>
</template>
