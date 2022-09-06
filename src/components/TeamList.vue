<!--
Copyright Fauna, Inc.
SPDX-License-Identifier: MIT-0
-->
<template>
  <ul class="divide-y divide-gray-200">
    <TeamItem v-for="team in teams" :key="team.id" :team="team"/>
  </ul>
</template>

<script>
import TeamItem from './TeamItem.vue'

export default {
  components: {
    TeamItem
  },
  setup() {
    return {
      teams: [
        {
          name: 'ManU',
          city: 'Manchester'
        },
        {
          name: 'Chelsea F.C.',
          city: 'Chelsea'
        }
      ]
    }
  }

}
</script>