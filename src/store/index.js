// Copyright Fauna, Inc.
// SPDX-License-Identifier: MIT-0

import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: {},
    numCartItems: 0,
    showCart: false,
    accessToken: null,
    loggedInName: null,
    shippingAndPaymentInfo: null,
    orderConfirmed: false
  },
  mutations: {
    addToCart(state, product) {
      state.numCartItems += 1;

      if (state.cart[product.id])
        state.cart[product.id] = {
          quantity: state.cart[product.id].quantity + 1,
          product: product
        }       
      else
        state.cart[product.id] = {
          quantity: 1,
          product: product
        }      
    },
    showCart(state) {
      state.showCart = true;
    },
    hideCart(state) {
      state.showCart = false;
    },
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setLoggedInName(state, name) {
      state.loggedInName = name;
    },
    updateShippingAndPaymentInfo(state, append) {    
      const currentState = state.shippingAndPaymentInfo ? state.shippingAndPaymentInfo : {}  
      state.shippingAndPaymentInfo = Object.assign(currentState, append)
    },
    orderSubmitted(state) {
      state.orderConfirmed = true;
      state.cart = {};
      state.numCartItems = 0;
      state.showCart = false;
    },
    closeAlert(state) {
      state.orderConfirmed = false;
    },
    logout(state) {
      state.accessToken = null;
      state.shippingAndPaymentInfo = null;
    },
    removeCartItem(state, id) {
      state.numCartItems -= state.cart[id].quantity;
      delete state.cart[id];
    }
  },
  actions: {
  },
  modules: {
  }
})
