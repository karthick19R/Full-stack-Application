<script setup>
import { ref, computed } from "vue";
import dialoguebox from '@/components/dialoguebox.vue'
import {qantityValidate} from '@/utils/validator'
const discountPercent = ref(10);
const taxPercent = ref(8);
const showdialoguebox = ref(false)

const cartItems = ref([
  { id: 1, name: "Laptop", price: 50000, quantity: 0 },
  { id: 2, name: "Mouse", price: 1000, quantity: 0 },
  { id: 3, name: "Keyboard", price: 2000, quantity: 0 },
  { id: 4, name: "Mouse pad", price: 200, quantity: 0 },
  { id: 3, name: "pouch", price: 300, quantity: 0 },
]);

const headers = [
  { title: "Item", key: "name" },
  { title: "Price (₹)", key: "price" },
  { title: "Quantity", key: "quantity" },
  { title: "Total (₹)", key: "total" },
];

const itemTotal = (item) => item.price * item.quantity;

const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + itemTotal(item), 0),
);

const discountAmount = computed(
  () => subtotal.value * (discountPercent.value / 100),
);

const afterDiscount = computed(() => subtotal.value - discountAmount.value);

const taxAmount = computed(
  () => afterDiscount.value * (taxPercent.value / 100),
);

const finalTotal = computed(() => afterDiscount.value + taxAmount.value);

function checkout() {
  showdialoguebox.value = true
}

function confirmcreate() {
     showdialoguebox.value = true
}
</script>
<template>
  <div class="checkout-container">
    <v-container class="">
          <v-card class="pa-8 ma-3" elevation="8" rounded="xl" >
            <v-card-title class="text-h4 font-weight-bold text-primary mb-6">
              Checkout Page
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="cartItems"
              item-key="id"
              density="comfortable"
              hide-default-footer
              class="mb-6"
            >
              <template #item.quantity="{ item }">
                <v-text-field
                  v-model.number="item.quantity"
                  type="number"
                  min="0"
                  max="100"
                  density="compact"
                  variant="outlined"
                  hide-details
                 @update:model-value="val => item.quantity = qantityValidate(val)"
                  style="max-width: 80px"
                />
              </template>

              <template #item.total="{ item }">
                <span class="font-weight-medium text-primary">
                  ₹ {{ itemTotal(item).toFixed(2) }}
                </span>
              </template>
            </v-data-table>
            <v-divider class="mb-6"></v-divider>
            <v-row justify="end" class="ma-3">
              <v-col cols="9" class="ml-6"><span>Subtotal</span></v-col>
              <v-col><strong>₹ {{ subtotal.toFixed(2) }}</strong></v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="12" md="6">
                <span>Discount %</span>
              </v-col>
              <v-col>
                <v-text-field
                  v-model.number="discountPercent"
                  type="number"
                  variant="outlined"
                  density="compact"
                  style="max-width: 80px"
                  class="mb-5"
                  min="0"
                  max="100"
                  @update:model-value="val => discountPercent = qantityValidate(val)"
                />
              </v-col>
              <v-col>
                <strong>- ₹ {{ discountAmount.toFixed(2) }}</strong>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="6">
                <span>Tax %</span>
              </v-col>
              <v-col>
                <v-text-field
                  v-model.number="taxPercent"
                  type="number"
                  variant="outlined"
                  density="compact"
                  style="max-width: 80px"
                  class="mb-4"
                  min="0"
                  max="100"
                  @update:model-value="val => taxPercent = qantityValidate(val)"
                />
              </v-col>
              <v-col>
                <strong>+ ₹ {{ taxAmount.toFixed(2) }}</strong>
              </v-col>
            </v-row>
            <v-divider class="my-3"></v-divider>
            <v-row justify="end" class="ma-3">
              <v-col cols="9" class="pl-3"><span>Total</span></v-col>
              <v-col>
                <span class="text-success">
                  ₹ {{ finalTotal.toFixed(2) }}
                </span>
              </v-col>
            </v-row>
            <dialoguebox v-model="showdialoguebox" @yes="confirmcreate">
              <template #title>
                Confirm User Order
              </template>
              <template #message>
                
               Total price : {{ finalTotal }}
               Are You Sure with your Order
              </template>
            </dialoguebox>

            <v-btn
              color="success"
              size="large"
              block
              rounded="xl"
              class="ma-6 pa-5"
              :disabled="finalTotal <= 0"
              @click="checkout">
              Checkout
            </v-btn>
          </v-card>
    </v-container>
  </div>
</template>

<style scoped>
.checkout-container {
  min-width: 80vh;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 40px 40px;
}
</style>

