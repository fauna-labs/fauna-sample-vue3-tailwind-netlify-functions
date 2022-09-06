// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { createRouter, createWebHistory } from 'vue-router';
import Products from '../views/Products.vue';
import Checkout from '../views/Checkout.vue';
import Orders from '../views/MyOrders.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Products
  },
  {
    path: '/checkout',
    component: Checkout
  },
  {
    path: '/orders',
    component: Orders
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
