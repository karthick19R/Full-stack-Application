<script setup>
import { ref, watch, computed } from 'vue'
import { inject } from 'vue'
// const {theme,changetheme} = inject('themes')
console.log("Inside table component !")
const props = defineProps({
  headers: Array,
  rows: Array,
  modelValue: String,
  emptyText: {
    type: String,
    default: 'No data available'
  },
  rowsPerPage: {
    type: Number,
    default: 5
  }
})
// console.log('Theme provider mounted, theme =', theme.value)
const emit = defineEmits(['delete-row', 'update:modelValue'])
const currentpage = ref(1)
watch(
  () => props.rows,
  () => {
    currentpage.value = 1
  }
)

const pagedRows = computed(() => {
  const start = (currentpage.value - 1) * props.rowsPerPage
  const end = start + props.rowsPerPage
  return props.rows.slice(start, end)
})
console.log("pagedRows : ",pagedRows)

// const displytheme = computed(()=>{
//   return theme.value === 'dark' ? 'dark-container':'light-container'
// })

const totalPages = computed(() =>
  Math.ceil(props.rows.length / props.rowsPerPage)
)
// function deleterow(rIndex) {
//   const confirmDelete = window.confirm(
//     'Are you sure you want to delete this record?'
//   )
//   if (!confirmDelete) return
//   const globalIndex =
//     (currentpage.value - 1) * props.rowsPerPage + rIndex

//   emit('delete-row', globalIndex)
// }

function nextPage() {
  if (currentpage.value < totalPages.value) {
    currentpage.value++
  }
}
function previousPage() {
  if (currentpage.value > 1) {
    currentpage.value--
  }
}
const dataAvailable = computed(() => props.rows.length > 0)

const filteredHeaders = computed(() => {
  if (!props.headers) return []
  return props.headers
    .filter(h => h !== 'password')
    .filter(h => h !== 'updatedAt')
    .filter(h => h !== 'createdAt')
    .map(h => ({
      title: h.toUpperCase(),
      key: h,
      align: 'start'
    }))
    .concat([
      { title: 'REMOVE', key: 'delete', align: 'center', sortable: false },
      { title: 'ACTIONS', key: 'actions', align: 'center', sortable: false }
    ])
})
console.log("filteredHeaders : ",filteredHeaders)
</script>
<template>
  <v-container fluid class="py-8 px-4">
    <!-- Header with Title and Theme Button -->
    <!-- <v-row class="mb-6 align-center">
      <v-col cols="12" sm="6">
        <h1 class="text-h5 font-weight-bold">Users Table</h1>
      </v-col> 
      <v-col cols="12" sm="6" class="d-flex justify-end">
        <v-btn
          @click="changetheme"
          icon
          variant="tonal"
          color="primary"
          size="large"
        >
          <v-icon v-if="theme === 'light'">mdi-moon-waning-crescent</v-icon>
          <v-icon v-else>mdi-white-balance-sunny</v-icon>
        </v-btn>
      </v-col>
    </v-row> -->

    <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-text-field
          :value="modelValue"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="comfortable"
          @update:modelValue="emit('update:modelValue', $event)"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <v-card elevation="2" class="rounded-lg">
      <v-card-text class="pa-0">
        <div v-if="rows.length" class="table-container">
          <v-data-table
            :headers="filteredHeaders"
            :items="pagedRows"
            :items-per-page="rowsPerPage"
            hide-default-footer
            class="simple-table"
          >
            <template #item.delete="{ item, index }">
              <slot name="delete" :index="(currentpage - 1) * rowsPerPage + index"></slot>
            </template>
            
            <template #item.actions="{ item }">
              <v-btn
                size="small"
                color="primary"
                variant="text"
                :to="`/user/edit/${item.id}`"
                :disabled="!item.id"
              >
                Edit
              </v-btn>
            </template>
          </v-data-table>
        </div>

        <v-empty-state
          v-else
          icon="mdi-information"
          title="No Data"
          text="No users found"
          class="pa-8"
        ></v-empty-state>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-text class="pa-4 d-flex align-center justify-center">
        <v-btn
          @click="previousPage"
          :disabled="currentpage === 1"
          variant="tonal"
          color="primary"
          class="mr-4"
        >
          Previous
        </v-btn>
        <span class="mx-4 font-weight-medium">Page {{ currentpage }} of {{ totalPages }}</span>
        <v-btn
          @click="nextPage"
          :disabled="currentpage === totalPages"
          variant="tonal"
          color="primary"
          class="ml-4"
        >
          Next
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
}

.simple-table {
  background: transparent !important;
}

.simple-table :deep(thead) {
  background: transparent !important;
}

.simple-table :deep(thead th) {
  background: #f5f5f5 !important;
  color: #333 !important;
  font-weight: 600 !important;
  border-bottom: 2px solid #ddd !important;
  padding: 12px !important;
}

.simple-table :deep(tbody tr) {
  border-bottom: 1px solid #eee !important;
  transition: background-color 0.2s ease;
}

.simple-table :deep(tbody tr:hover) {
  background: #fafafa !important;
}

.simple-table :deep(td) {
  padding: 12px !important;
  color: #333 !important;
}

:deep(.v-data-table__wrapper) {
  border-radius: 8px;
}

:deep(.v-card) {
  border-radius: 8px !important;
}
</style>
