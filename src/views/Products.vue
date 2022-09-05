<template>
  <div class="bg-white">
    <Cart v-if="showCart"/>
    <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>
      <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <ProductItem v-for="product in productCatalog" :key="product.id" :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../components/ProductItem.vue';
import Cart from '../components/Cart.vue';

export default {
  name: "Products",
  components: { ProductItem, Cart },
  data() {
    return {
      productCatalog: []
    };
  },
  computed: {
    showCart() {
      return this.$store.state.showCart
    }
  },
  setup() {
    return {
    }
  },
  mounted() {
    this.loadProducts()
  },
  methods: {
    async loadProducts() {
      let res = await fetch('/.netlify/functions/products');
      let data = await res.json();
      this.productCatalog = data;
    }
  }
}
</script>