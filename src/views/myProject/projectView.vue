<template>
  <div class="flex">
    <!-- 侧边菜单开始 -->
    <el-menu
      default-active="2"
      class="relative el-menu-vertical-demo w-[180px] fixed top-[64px] box-shadow overflow-hidden"
      :style="{ height: `${height}` }"
      @open="handleOpen"
      @close="handleClose"
      :collapse="lefts"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><Expand color="#303133" /></el-icon>
          <span>项目列表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"
            ><el-icon><Tickets /></el-icon>全部项目</el-menu-item
          >
          <el-menu-item index="1-2"
            ><el-icon><Star /></el-icon>我的收藏</el-menu-item
          >
          <el-menu-item index="1-3"
            ><el-icon><Briefcase /></el-icon>已归档项目</el-menu-item
          >
          <el-menu-item index="1-4"
            ><el-icon><Delete /></el-icon>回收站</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><Notebook /></el-icon>
        <span>项目模板</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><BellFilled color="#303133" /></el-icon>
          <span>消息提醒</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1"
            ><el-icon><ChatDotRound /></el-icon>@我</el-menu-item
          >
          <el-menu-item index="1-2"
            ><el-icon><Loading /></el-icon>通知</el-menu-item
          >
          <el-menu-item index="1-3"
            ><el-icon><Message /></el-icon>私信</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <div
        class="absolute bottom-0 flex justify-center items-center w-[100%] h-[40px] bg-gray-700"
        @click="lefts = !lefts"
      >
        <el-icon
          ><ArrowLeftBold v-if="lefts === false" color="#ccc" size="45" />
          <ArrowRightBold v-if="lefts === true" color="#ccc" size="45" />
        </el-icon>
      </div>
    </el-menu>
    <!-- 侧边菜单结束 -->
  </div>
</template>
<script setup lang="ts">
// 字体图标
import {
  Notebook,
  BellFilled,
  Expand,
  Tickets,
  Star,
  Briefcase,
  Delete,
  ChatDotRound,
  Message,
  Loading,
  ArrowLeftBold,
  ArrowRightBold,
} from '@element-plus/icons-vue';

// get/post请求
import projectApi from '@/api/modules/project';

// 设置侧边菜单高度
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

// 展开/收起侧边菜单
const lefts = ref(false);

// 折叠组件事件
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

// get请求负载数据
const data = {
  collection: 0,
  is_recycle: 0,
};
// 获取列表数据
projectApi
  .getProjectsList(data)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
</script>
<style lang="scss">
.box-shadow {
  box-shadow: 2.4px 0px 1.4px rgba(0, 0, 0, 0.07), 5.7px 0px 3.4px rgba(0, 0, 0, 0.056),
    10.8px 0px 6.4px rgba(0, 0, 0, 0.02), 19.2px 0px 11.4px rgba(0, 0, 0, 0), 35.9px 0px 21.3px rgba(0, 0, 0, -0.002),
    86px 0px 51px rgba(0, 0, 0, -0.002);
}
</style>
