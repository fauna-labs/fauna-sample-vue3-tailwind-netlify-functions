<!--
Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0
-->
<template>
    <a href="#" class="group">
      <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <img :src="img" :class="style">
      </div>
    </a>
</template>

<script>
export default {
  name: 'ProductImage',
  props: {
    product: Object,
    width: {
      type: Number,
      default: 40
    }
  },
  computed: {
    img() {
      return this.demoAssets(this.product);
    },
    style() {
      return `h-${this.width} w-${this.width} object-cover object-center group-hover:opacity-75`;
    }
  },
  methods: {
    // for demo purposes, images are local assets. They'd be stored in Object storage/CMS otherwise; 
    // And image URIs returned from the API along with the product details
    demoAssets(product) {
      let name = product.name;
      if (name == 'pinata' && product.description.includes('Taco')) name = 'pinata2'
      let img;
      switch (name) {
        case 'pinata':
          img = require('../assets/img/pinata.jpg')
          break;
        case 'cups':
          img = require('../assets/img/cups.jpg')
          break;
        case 'pizza':
          img = require('../assets/img/pizza.jpg')
          break;
        case 'avocados':
          img = require('../assets/img/avocados.jpg')
          break;
        case 'limes':
          img = require('../assets/img/limes.jpg')
          break;
        case 'cilantro':
          img = require('../assets/img/cilantro.jpg')
          break;
        case 'pinata2':
          img = require('../assets/img/pinata2.jpg')
          break;
      }
      return img;
    }
  }
}
</script>