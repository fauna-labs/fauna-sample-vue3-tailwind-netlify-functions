<template>
    <div :class="colSpans">
      <label :for="name" class="block text-sm font-medium text-gray-700">{{label}}</label>
      <input 
        required
        type="text" :name=name :id=name 
        :value=modelValue @input="$emit('update:modelValue', $event.target.value)"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
    </div>
</template>

<script>
export default {
  name: 'CheckoutFormField',
  props: {
    colSpan: {
      type: String,
      default: "6"
    },
    colSpanSm: String,
    colSpanLg: String,
    label: String,
    name: String,
    modelValue: String
  },
  computed: {
    colSpans() {
      let colSpans = ''
      colSpans = 'col-span-' + this.colSpan;

      if (this.colSpanSm)
        colSpans += ' sm:col-span-' + this.colSpanSm;

      if (this.colSpanLg)
        colSpans += ' lg:col-span-' + this.colSpanLg;

      return colSpans;
    }
  }
}
</script>