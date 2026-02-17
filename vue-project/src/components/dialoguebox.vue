<script setup>
const value = defineModel({
  type: Boolean,
  default: false
})

const emit = defineEmits(['yes', 'no'])

function onYes() {
  emit('yes')
  value.value = false
}

function onNo() {
  emit('no')
  value.value = false
}
</script>
<template>
 <v-dialog
  v-model="value"
  transition="dialog-bottom-transition"
  max-width="500"
>
  <v-card rounded="t-xl">

    <v-card-title class="text-center text-h6 font-weight-bold">
      <slot name="title">Confirmation</slot>
    </v-card-title>

    <v-card-text class="text-center py-6">
      <slot name="message">
        Please confirm your activity
      </slot>
    </v-card-text>

    <v-divider />

    <v-card-actions class="pa-0">
      <v-row no-gutters>
        <v-col cols="6">
          <v-btn block variant="text" height="50" @click="onNo">
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            block
            color="primary"
            height="50"
            @click="onYes"
          >
            Confirm
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

  </v-card>
</v-dialog>

</template>
