<template>
  <div class="flex mt-[65px]">
    <div class="h-screen w-[180px] fixed top-[65px] box-shadow">
      <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><Expand color="#fff" /></el-icon>
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
            <el-icon><BellFilled color="#fff" /></el-icon>
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
      </el-menu>
    </div>
  </div>
</template>
<script setup lang="ts">
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
} from '@element-plus/icons-vue';
import projectApi from '@/api/modules/project';

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const data = {
  collection: 0,
  is_recycle: 0,
};
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
