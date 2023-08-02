<template>
  <div class="h-full bg-[#F4F4F4]">
    <Header></Header>
    <div style="height: calc(100% - 65px)" class="overflow-y-scroll no-scrollbar">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/HeaderView.vue';
</script>
<style scoped></style>
