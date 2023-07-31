<template>
  <div class="h-screen bg-[#F4F4F4] flex flex-col">
    <Header></Header>
    <div class="flex-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './components/HeaderView.vue';
</script>
<style scoped></style>
