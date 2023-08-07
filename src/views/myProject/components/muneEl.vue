<template>
  <!-- 侧边菜单开始 -->
  <el-menu
    :default-active="menuStr"
    :class="['box-border', 'border-none', `h-[${height}]`, 'relative', 'z-10', 'el-menu-vertical-demo', 'box-shadow']"
    :collapse="lefts"
  >
    <el-sub-menu index="1" class="flex flex-col">
      <template #title>
        <el-icon><Expand color="#303133" /></el-icon>
        <span class="pr-[25px]">项目列表</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="1-1" @click="menuItem('1')"
          ><el-icon><Tickets /></el-icon>全部项目</el-menu-item
        >
        <el-menu-item index="1-2" @click="menuItem('2')"
          ><el-icon><Star /></el-icon>我的收藏</el-menu-item
        >
        <el-menu-item index="1-3" @click="menuItem('3')"
          ><el-icon><Briefcase /></el-icon>已归档项目</el-menu-item
        >
        <el-menu-item index="1-4" @click="menuItem('4')"
          ><el-icon><Delete /></el-icon>回收站</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="2" @click="menuItem('22')">
      <el-icon><Notebook /></el-icon>
      <span>项目模板</span>
    </el-menu-item>
    <el-sub-menu index="3">
      <template #title>
        <el-icon><BellFilled color="#303133" /></el-icon>
        <span>消息提醒</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="2-1" @click="menuItem('mention')"
          ><el-icon><ChatDotRound /></el-icon>@我</el-menu-item
        >
        <el-menu-item index="2-2" @click="menuItem('inform')"
          ><el-icon><Loading /></el-icon>通知</el-menu-item
        >
        <el-menu-item index="2-3" @click="menuItem('personal')"
          ><el-icon><Message /></el-icon>私信</el-menu-item
        >
      </el-menu-item-group>
    </el-sub-menu>
    <div
      class="absolute left-0 bottom-0 flex justify-center pr-[25px] items-center w-[100%] h-[40px] bg-gray-700"
      @click="lefts = !lefts"
    >
      <el-icon class="ml-[16px]"
        ><ArrowLeftBold v-if="lefts === false" color="#ccc" size="45" />
        <ArrowRightBold v-if="lefts === true" color="#ccc" size="45" />
      </el-icon>
    </div>
  </el-menu>
  <!-- 侧边菜单结束 -->
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
  ArrowLeftBold,
  ArrowRightBold,
} from '@element-plus/icons-vue';
import router from '@/router';

const { href, pathname } = window.location;
const height = ref(`${window.innerHeight - 65}px`);
const menuItem = (str: string) => {
  if (str === '22') {
    router.push('/Home/projectManagement/ProjectTemplate');
  } else if (Number.isNaN(Number(str)) === true) {
    router.push(`/Home/projectManagement/message/${str}`);
  } else {
    router.push(`/Home/projectManagement/projectLists/${str}`);
  }
};
const activeName = ref(href.slice(-1));
const menuStr = ref('1-1');

const initialize = () => {
  if (pathname === '/Home/projectManagement/ProjectTemplate') {
    menuStr.value = `2`;
  } else if (Number.isNaN(Number(href.slice(-1))) === false) {
    menuStr.value = `1-${activeName.value}`;
    console.log(activeName);
  } else {
    const str = pathname;
    if (str.substring(str.lastIndexOf('/') + 1) === 'mention') {
      menuStr.value = `2-1`;
    } else if (str.substring(str.lastIndexOf('/') + 1) === 'inform') {
      menuStr.value = `2-2`;
    } else if (str.substring(str.lastIndexOf('/') + 1) === 'personal') {
      menuStr.value = `2-3`;
    }
  }
};
initialize();
router.beforeEach((to) => {
  activeName.value = to.path.slice(-1);
  console.log(to.path);
  if (to.name === 'ProjectTemplate') {
    menuStr.value = `2`;
  } else if (
    to.name === 'ProjectLists1' ||
    to.name === 'ProjectLists2' ||
    to.name === 'ProjectLists3' ||
    to.name === 'ProjectLists4'
  ) {
    initialize();
  }
});
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
</script>
<style lang="scss">
.box-shadow {
  box-shadow: 2.4px 0px 1.4px rgba(0, 0, 0, 0.07), 5.7px 0px 3.4px rgba(0, 0, 0, 0.056),
    10.8px 0px 6.4px rgba(0, 0, 0, 0.02), 19.2px 0px 11.4px rgba(0, 0, 0, 0), 35.9px 0px 21.3px rgba(0, 0, 0, -0.002),
    86px 0px 51px rgba(0, 0, 0, -0.002);
}
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 14px;
  font-weight: 600;
}
</style>
