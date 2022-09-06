<!--
Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0
-->
<template>
  <li class="py-4 pl-4 flex">
    <img class="h-10 w-10 rounded-full" :src="team.logo" alt="" />
    <div class="ml-3">
      <p class="text-md font-medium text-gray-900">{{ team.name }}</p>
      <p class="text-xs text-gray-500">{{ team.city }}</p>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    team: Object
  },
}
</script>