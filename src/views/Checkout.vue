<!--
Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0
-->
<template>
  <div class="bg-white">
    <div class="mx-auto grid max-w-2xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 items-start gap-y-16 gap-x-8 py-24 px-4 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
      
      <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6 text-left">
        <form class="space-y-6 divide-y-2" action="#" method="POST">
          <div class="">
            <h2 class="text-lg font-medium text-gray-900 pb-4" id="contact-information">Contact Information</h2>
            <div class="grid grid-cols-6 gap-6">
              <CheckoutFormField colSpan="6" colSpanSm="4" label="Email address" name="email"/>
            </div>
          </div>
          <div class="pt-4">
            <h2 class="text-lg font-medium text-gray-900 pb-4" id="shipping-information">Shipping Information</h2>
            <div class="grid grid-cols-6 gap-4">
              <CheckoutFormField colSpan="6" colSpanSm="3" label="First name" name="given-name" v-model="customerInfo.firstName"/>
              <CheckoutFormField colSpan="6" colSpanSm="3" label="Last nane" name="family-name" v-model="customerInfo.lastName"/>
              <div class="col-span-6 sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                <select id="country" name="country" autocomplete="country-name"
                  class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                  <option v-for="country in countries" :key="country">{{country}}</option>
                </select>
              </div>
              <CheckoutFormField colSpan="6" label="Street address" name="street-address" v-model="address.street"/>
              <CheckoutFormField colSpan="6" colSpanSm="6" colSpanLg="2" label="City" name="city" v-model="address.city"/>
              <CheckoutFormField colSpan="6" colSpanSm="3" colSpanLg="2" label="State / Province" name="state-province" v-model="address.state"/>
              <CheckoutFormField colSpan="6" colSpanSm="3" colSpanLg="2" label="ZIP / Postal Code" name="postal-code" v-model="address.zipCode"/>
            </div>
          </div>
          <!-- <div class="pt-4">
            <h2 class="text-lg font-medium text-gray-900 pb-4" id="delivery-method">Delivery Method</h2>
          </div> -->
          <div class="pt-4">
            <h2 class="text-lg font-medium text-gray-900" id="payment-method">Payment Method</h2>

            <fieldset class="pb-4">
              <div class="mt-4 flex justify-start">
                <div class="flex items-center px-2" 
                  v-for="method in paymentMethods" :key="method">
                  <input :id="'pay-' + method" name="'pay-' + method" type="radio" class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    :checked="method=='CreditCard'"
                    >
                  <label for="'pay-' + method" class="ml-3 block text-sm font-medium text-gray-700">{{method}}</label>
                </div>
              </div>
            </fieldset>     
            <div class="grid grid-cols-6 gap-4">
              <CheckoutFormField colSpan="6" label="Card number" name="card-number" v-model="creditCard.number"/>
              <CheckoutFormField colSpan="6" label="Name on card" name="name-on-card" v-model="creditCard.name"/>
              <CheckoutFormField colSpan="4" label="Expiration date (MM/YY)" name="expiration-date" v-model="creditCard.exp"/>
              <CheckoutFormField colSpan="2" label="CVC" name="card-cvc" v-model="creditCard.cvc"/>
            </div>
            
          </div>

        </form>
      </div>

      <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6 text-left">
        <h2 class="text-lg font-medium text-gray-900 pb-4" id="order-summary">Order summary</h2>
        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
          <CartList />
        </div>
        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${{ subtotal }}</p>
          </div>
          <div class="mt-4">
            <button @click="submitOrder"
              type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">            
              Confirm Order</Button>
          </div>
          <div class="mt-6 flex justify-start">
            <button @click="continueShopping" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
              <span aria-hidden="true"> &larr;</span>
              Back to shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartList from '../components/CartList.vue';
import CheckoutFormField from '../components/CheckoutFormField.vue';


export default {
  name: 'Checkout',
  components: {
    CartList,
    CheckoutFormField
  },
  computed: {
    subtotal() {
      const store = this.$store.state.cart;
      let subtotal = 0;
      for (const key in store) {
        subtotal += store[key].product.price;
      }
      return subtotal.toFixed(2);
    },
    accessToken() {
      return this.$store.state.accessToken;
    }
  },
  data() {
    return {
      countries: ['United States', 'Canada', 'Mexico'],
      paymentMethods: ['CreditCard', 'PayPal', 'eTransfer'],
      customerInfo: {},
      address: {},
      creditCard: {}
    }
  },
  mounted() {
    this.populateCustomerInfo(this.$store.state.accessToken);
  },
  methods: {
    async populateCustomerInfo(token) {
      if (!token) {
        return;
      }

      const shippingAndPaymentInfo = this.$store.state.shippingAndPaymentInfo;
      if (shippingAndPaymentInfo) {
        this.customerInfo = shippingAndPaymentInfo;
        this.address = shippingAndPaymentInfo.address;
        this.creditCard = shippingAndPaymentInfo.creditCard;
        return;
      }

      const res = await fetch(
            '/.netlify/functions/customers', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            },
          });
      const data = await res.json();
      this.customerInfo = data;
      this.address = data.address ? data.address : {};
      this.creditCard = data.creditCard ? data.creditCard : {};
      this.creditCard.name = `${this.customerInfo.firstName} ${this.customerInfo.lastName}`;

      this.$store.commit("updateShippingAndPaymentInfo", data);
    },
    continueShopping() {
      this.$router.push('/');
    },
    async submitOrder() {
      const store = this.$store.state.cart;
      let cart = [];
      for (const key in store) {
        const product = store[key];
        cart.push({
          productId: product.product.id,
          quantity: product.quantity
        });
      }
      const res = await fetch(
            '/.netlify/functions/orders', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.accessToken}`
            },
            body: JSON.stringify({
              products: cart,
              shippingAddress: this.address,
              paymentInfo: this.creditCard
            })
          });
      const data = await res.json();
      if (data.status === 'processing') {
        this.$store.commit("orderSubmitted");
        this.$router.push('/');
      } else {
        // TODO: do some UI stuff
        alert('there was a problem');
      }     
    }
  },
  watch: {
    accessToken(oldValue, newValue) {
      const token = newValue ? newValue : oldValue;
      this.populateCustomerInfo(token);
    },
    customerInfo: {
      handler(newValue) {
        console.log('info update');
        this.$store.commit("updateShippingAndPaymentInfo", newValue);
      },
      deep: true
    }
  }

}
</script>