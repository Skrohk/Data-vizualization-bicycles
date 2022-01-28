<template>
  <div class="home">
    <sidebar/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import * as d3 from 'd3';
import Sidebar from '@/components/Sidebar.vue';

@Options({
  components: {
    Sidebar,
  },
})
export default class Home extends Vue {}
</script>
