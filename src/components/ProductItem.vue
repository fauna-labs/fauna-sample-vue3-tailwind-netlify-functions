<template>
  <div class="flex flex-col">
    <ProductImage :width=80 :product="product"/>

    <div class="flex flex-row">
      <button @click="buy(product)" class="">
        <div class="pl-2 py-2 h-full w-full flex items-center">
          <ShoppingCartIcon class="h-8 w-8" />
          <div class="-ml-6 p-4 opacity-0 hover:opacity-100 duration-300 absolute flex justify-start items-center text-md text-indigo-700 bg-white font-semibold">Add to cart</div>
        </div>
      </button>
      <div class="w-full">
        <h3 class="mt-4 text-sm text-gray-700">{{ product.name }}</h3>
        <h6 class="text-xs">{{ product.description }}</h6>
        <p class="mt-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import ProductImage from './ProductImage.vue';

export default {
  name: 'ProductItem',
  props: {
    product: Object
  },
  components: {
    ShoppingCartIcon,
    ProductImage
  },
  methods: {
    buy(product) {
      this.$store.commit("addToCart", product);
    }
  }
}
</script>