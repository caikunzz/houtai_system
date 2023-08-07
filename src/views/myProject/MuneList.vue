<template>
  <div class="W-[100%] flex bg-[#f5f5f5] overflow-hidden" :class="`h-[${height}]`">
    <div class="flex w-[100%]" :class="`h-[${height}]`">
      <Mune></Mune>
      <div class="w-[100%] p-[20px] overflow-auto">
        <div class="bg-[#fff] p-[20px] text-[14px] relative">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Mune from './components/muneEl.vue';

const height = ref(`${window.innerHeight - 65}px`);
// 监听窗口变化事件
const handleResize = () => {
  height.value = `${window.innerHeight - 65}px`;
};
// 添加实例
onMounted(() => {
  window.addEventListener('resize', handleResize);
});
// 销毁实例
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
