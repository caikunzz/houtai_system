<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
    <el-tab-pane label="全部项目" name="1"></el-tab-pane>
    <el-tab-pane label="我的收藏" name="2"></el-tab-pane>
    <el-tab-pane label="已归档项目" name="3"></el-tab-pane>
    <el-tab-pane label="回收站" name="4"></el-tab-pane>
  </el-tabs>
  <el-button
    type="primary"
    :icon="Plus"
    size="large"
    class="absolute right-6 top-[.75rem] h-[40px]"
    @click="centerDialogVisible = true"
    >创建新项目</el-button
  >
  <Templates :show="centerDialogVisible" :project="true" @change="val" />
  <div class="text-[14px] text-[#00000073]">
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue';

import type { TabPaneName } from 'element-plus';
import Templates from '@/views/myProject/components/createTemplate.vue';
import router from '@/router';

const { href } = window.location;
const activeName = ref(href.slice(-1));
const centerDialogVisible = ref(false);
const handleClick = (name: TabPaneName) => {
  router.push(`/Home/projectManagement/projectLists/${name}`);
};
router.beforeEach((to) => {
  console.log(to.path);
  if (
    to.name === 'ProjectLists1' ||
    to.name === 'ProjectLists2' ||
    to.name === 'ProjectLists3' ||
    to.name === 'ProjectLists4'
  ) {
    activeName.value = to.path.slice(-1);
  }
});
const val = (res: boolean) => {
  centerDialogVisible.value = res;
};
</script>
