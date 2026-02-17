<script setup>
import { ref } from 'vue'

const content = "<b>Hello</b> <i>Vue</i>"
</script>

<template>
  <h1>CSK</h1>
  <div v-html="content">
  </div>
</template>
