<script setup>
import { computed, ref } from 'vue';
import dialoguebox from '@/components/dialoguebox.vue'
import { useUserDetails } from '@/stores/score';
import { getusers } from '@/service/userapi';
import { useRouter } from 'vue-router'
const router = useRouter()
import { onMounted } from 'vue'

const users = ref([])

onMounted(async () => {
  const apiusers = await getusers()
  console.log("Runing onmounted")
  console.log(apiusers)
  users.value = apiusers.data.data
  console.log("users :",users)
  console.log("users.value :",users.value)
})
// console.log(apiusers)
// console.log("Api Users",apiusers)
// const userstore =useUserDetails()
console.log("users",users.value)

const headers = computed(() => {
  if (!users.value.length) return []
  return Object.keys(users.value[0])
})


console.log("headers :",headers.value)
const showdialoguebox = ref(false)
const search =ref('')
const deleteid = ref()
//console.log(userstore.users)
function removeUser(index) {
  deleteid.value=index
  // const confirmDelete = window.confirm(
  //   'Are you sure you want to delete this record?'
  // )
  // if (!confirmDelete) return
  showdialoguebox.value=true
}

const rows = computed(() => {
  if (!search.value) return users.value

  return users.value.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(search.value.toLowerCase())
    )
  )
})


console.log("rows :",rows.value)

function confirmUpdate(){
    //userstore.removeUser(deleteid)
    showdialoguebox.value=false
    router.push('/table')
}
</script>

<template>
  <div class="table-page">
    <v-container class="py-6">
      <v-card elevation="2" class="table-card">
        <v-card-title class="text-center text-h6 bg-primary text-white py-4">
          Users Directory
        </v-card-title>

        <v-card-text class="pa-6">
          <tablecomponent :headers="headers" :rows="rows" @delete-row="removeUser" v-model="search">
            <template #delete="{ index }">
              <v-btn size="small" color="error" variant="tonal" @click="removeUser(index)">
                Remove
              </v-btn>
            </template>
          </tablecomponent>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="text-center pa-4">
          <v-btn color="primary" variant="outlined" @click="$router.back()">
            Go Back
          </v-btn>
        </v-card-text>
      </v-card>
    </v-container>

    <dialoguebox v-model="showdialoguebox" @yes="confirmUpdate">
      <template #title>Delete User</template>
      <template #message>Are you sure you want to delete this user?</template>
    </dialoguebox>
  </div>
</template>

<style scoped>
.table-page {
  background: #f0f4f8;
  min-height: 100vh;
  overflow-y: auto;
  padding: 24px;
}

.table-card {
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(15, 23, 42, 0.12);
  border: 1px solid #e2e8f0;
  background: white;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.table-card:hover {
  box-shadow: 0 8px 32px rgba(15, 23, 42, 0.16);
}

.table-card :deep(.v-card__title) {
  letter-spacing: 0.3px;
  font-weight: 700;
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
}

</style>