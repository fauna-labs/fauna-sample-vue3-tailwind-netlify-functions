<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/checkout">Checkout</router-link>
  </div> -->
  <div class="grid grid-cols-1 gap-0">
    <p
      class="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
      Get free delivery on orders over $100</p>

    <div v-if="orderConfirmed"
      class="flex h-20 items-center justify-end bg-green-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
      <p class="grow w-full">Order Confirmed</p>
      <div class="flex-none w-9">
        <button @click="closeAlert"
          type="button" class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
          <span class="sr-only">Close message</span>
          <!-- Heroicon name: outline/x-mark -->
          <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>


    <StoreNav @show-login="showLogin()"/>
    <div v-if="signin">
      <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <Login @exit-login="exitLogin()"/>
        </div>
      </div>
    </div>
    <router-view/>
  </div>  
</template>

<script>
import StoreNav from './components/StoreNav.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  components: {
    StoreNav,
    Login
  },
  data() {
    return {
      signin: false
    }
  },
  computed: {
    orderConfirmed() {
      return this.$store.state.orderConfirmed;
    }
  },
  methods: {
    showLogin() {
      this.signin = true;
    },
    exitLogin() {
      this.signin = false;
    },
    closeAlert() {
      this.$store.commit("closeAlert");
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
