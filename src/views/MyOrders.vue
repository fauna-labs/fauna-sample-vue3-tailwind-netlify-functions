<template>
  <div class="flex justify-center overflow-hidden bg-white shadow sm:rounded-lg">
    <div>
      <div class="w-full text-right py-2">
        <button @click="continueShopping"
          class="font-medium text-indigo-600 hover:text-indigo-500">
          <span aria-hidden="true"> &larr;</span>
          Back to shopping
        </button>
      </div>

      <div class="px-4 py-5 sm:px-6 text-left">
        <h1 class="text-3xl font-medium leading-6 text-gray-900">Order History</h1>
        <p class="mt-4 max-w-2xl text-md text-gray-500">
          Check the status of recent orders, manage returns, and discover similar products.</p>
      </div>
      <div v-for="order in myOrders" :key="order.id" class="text-left p-4">
        <div class="px-6 py-4 border rounded-md">
          <div class="grid grid-cols-12 gap-4">
            <div class="col-span-4 mb-6 flex flex-col">
              <h1 class="text-lg font-medium leading-6 text-gray-900">Order</h1>
              <p class="text-sm font-light">{{ order.id }}</p>
              <div class="flex flex-row text-md">
                <p class="font-medium">Placed: </p>
                <p class="ml-2">{{order.orderPlaced}}</p>
              </div>
              
            </div>
            <div class="col-span-2 flex flex-col">
              <p class="text-lg font-medium">Total</p>
              <p>${{ order.total }}</p>
            </div>
            <div class="col-span-2 flex flex-col">
              <p class="font-medium">Status</p>
              <p class="">{{ order.status }}</p>
            </div>
            <div class="col-span-2">
              <button @click="tbd"
                class="px-4 py-2 border rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                View Order</button>
            </div>
            <div class="col-span-2">
              <button @click="tbd"
                class="px-4 py-2 border rounded-md text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                View Invoice</button>
            </div>
          </div>
          <div class="flow-root">
            <CartItem v-for="product in order.cart" :key="product.id" :product="product" readOnly />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from '../components/CartItem.vue';

export default {
  name: 'MyOrders',
  components: {
    CartItem
  },
  data() {
    return {
      myOrders: []
    }
  },
  mounted() {
    this.loadMyOrders();
  },
  methods: {
    async loadMyOrders() {
      let res = await fetch('/.netlify/functions/orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.$store.state.accessToken}`
        },
      });
      let data = await res.json();
      data = data.map(x => {
        const cart = x.cart;
        let total = 0;
        for (const p of cart) {
          total += p.product.price * p.quantity;
        }
        x.total = total.toFixed(2);
        x.orderPlaced = new Date(x.creationDate["@ts"]).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"});
        return x;
      });
      // sort descending
      data.sort((a, b)=>{ return (b.id > a.id) ? 1 : -1 });
      this.myOrders = data;
    },
    continueShopping() {
      this.$router.push('/');
    },
    tbd() {
      alert('nothing to see yet');
    }
  }
}
</script>


