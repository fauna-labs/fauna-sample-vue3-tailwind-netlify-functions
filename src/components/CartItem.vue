<!--
Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0
-->
<template>
  <li class="flex py-6">
    <ProductImage :width=20 :product="product.product"/>

    <div class="ml-4 flex flex-1 flex-col">
      <div>
        <div class="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a href="#">{{product.product.name}}</a>
          </h3>
          <p class="ml-4">${{product.product.price}}</p>
        </div>
        <p class="mt-1 text-sm text-gray-500">{{product.product.description}}</p>
      </div>
      <div class="flex flex-1 items-end justify-between text-sm">
        <p class="text-gray-500">Qty {{product.quantity}}</p>

        <div v-if="!readOnly"
          class="flex">
          <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import ProductImage from './ProductImage.vue';

export default {
  name: 'CartItem',
  components: {
    ProductImage
  },
  props: {
    product: Object,
    readOnly: {
      type: Boolean,
      default: false
    }
  }
}


</script>