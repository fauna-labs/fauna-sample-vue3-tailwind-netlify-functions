<!--
Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0
-->
<template>
  <div class="bg-white">
    <header class="relative bg-white">
      <nav aria-label="Top" class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="flex h-16 items-center">
            <!-- Logo -->
            <div class="ml-4 flex lg:ml-0">
              <a href="#">
                <span class="sr-only">Workflow</span>
                <img class="h-8 w-auto" src="https://images.ctfassets.net/po4qc9xpmpuh/7itYmeRxmVGIXwwGWHrQU3/42f3e7fa7d39fab5b6222f6199f0203c/Fauna_Logo.svg"
                  alt="">
              </a>
            </div>
            <div class="ml-auto flex items-center">
              <div class="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <AccountMenu v-if="loggedIn"/>
                <a v-else 
                  href="#" class="text-sm font-medium text-gray-700 hover:text-gray-800" @click="showLogin()">Sign in</a>
                <span class="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                <button
                  @click="tbd" 
                  class="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</button>
              </div>

              <div class="hidden lg:ml-8 lg:flex">
                <a href="#" class="flex items-center text-gray-700 hover:text-gray-800">
                  <img src="https://tailwindui.com/img/flags/flag-united-states.svg" alt=""
                    class="block h-auto w-5 flex-shrink-0">
                  <span class="ml-3 block text-sm font-medium">USD</span>
                  <span class="sr-only">, change currency</span>
                </a>
              </div>

              <!-- Search -->
              <div class="flex lg:ml-6">
                <a href="#" class="p-2 text-gray-400 hover:text-gray-500">
                  <span class="sr-only">Search</span>
                  <!-- Heroicon name: outline/magnifying-glass -->
                  <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </a>
              </div>

              <!-- Cart -->
              <div class="ml-4 flow-root lg:ml-6">
                <a href="#" class="group -m-2 flex items-center p-2" @click="showCart()">
                  <ShoppingCartIcon class="h-6 w-6" />                  
                  <span class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{{numCartItems}}</span>
                  <span class="sr-only">items in cart, view bag</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import AccountMenu from './AccountMenu.vue';

export default {
  name: 'StoreNav',
  components: {
    ShoppingCartIcon,
    AccountMenu
  },
  data() {
    return {}
  },
  computed: {
    numCartItems() {
      return this.$store.state.numCartItems;
    },
    loggedIn() {
      return this.$store.state.accessToken;
    }
  },
  methods: {
    showCart() {
      this.$store.commit("showCart");
    },
    showLogin() {
      this.$emit('show-login');
    },
    tbd() {
      alert('nothing to see yet');
    }
  }
}
</script>