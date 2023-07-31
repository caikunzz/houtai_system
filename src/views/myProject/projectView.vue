<template>
  <div class="flex h-screen overflow-hidden bg-[#f5f5f5]">
    <div class="w-screen mt-[65px] flex">
      <!-- 侧边菜单开始 -->
      <el-menu
        default-active="2"
        class="relative el-menu-vertical-demo w-[180px] box-shadow overflow-hidden"
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
      <!-- 项目列表开始 -->
      <div class="w-[100%] p-[20px] overflow-auto">
        <div class="bg-[#fff] p-[20px] text-[14px] relative">
          <el-button type="primary" :icon="Plus" size="large" class="absolute right-6 top-[.75rem] h-[40px]"
            >创建新项目</el-button
          >
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="全部项目" name="first">
              <ul v-for="(item, index) in listData.data[currentPage - 1]" :key="index">
                <li class="flex justify-between p-[10px]">
                  <div class="flex">
                    <img :src="`http://192.168.122.36:1024${item.cover}`" alt="" class="w-[50px] h-[50px]" />
                    <div>
                      <div class="flex items-center">
                        <span>{{ item.name }}</span>
                        <el-tag class="ml-2" type="success" size="small">公开</el-tag>
                      </div>
                      <p></p>
                    </div>
                  </div>
                  <div></div>
                </li>
              </ul>
              <el-pagination
                v-model:current-page="currentPage"
                background
                layout="prev, pager, next"
                :total="data.data.count"
              />
            </el-tab-pane>
            <el-tab-pane label="我的收藏" name="second">Config</el-tab-pane>
            <el-tab-pane label="已归档项目" name="third">Role</el-tab-pane>
            <el-tab-pane label="回收站" name="fourth">Task</el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <!-- 项目列表结束 -->
    </div>
  </div>
</template>
<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
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
  Plus,
} from '@element-plus/icons-vue';

import type { projectList } from '@/types';
// get/post请求
import projectApi from '@/api/modules/project';

// get请求负载数据
const getData = {
  collection: 0,
  is_recycle: 0,
};
// 获取列表数据
const data = ref({
  code: Number,
  data: {
    count: Number || 0,
    rows: Array,
  },
  msg: String,
});
const listData: {
  data: Array<any>;
} = {
  data: [], // 初始化为空数组
};
const groupArray = (arr: [], groupSize: number) => {
  const result = Array.from({ length: Math.ceil(arr.length / groupSize) }, (_, index) =>
    arr.slice(index * groupSize, index * groupSize + groupSize),
  );
  return result;
};
projectApi
  .getProjectsList(getData)
  .then((res) => {
    data.value.data = res.data;
    data.value.code = res.code;
    data.value.msg = res.msg;
    listData.data = groupArray(res.data.rows.reverse(), 10);
    console.log(listData.data);
  })
  .catch((err) => {
    console.log(err);
  });
console.log(data);

// 标签页
const activeName = ref('first');

const handleClick = (tab: TabsPaneContext, event: Event) => {
  // console.log(tab, event);
};
// 分页
const currentPage = ref(1);

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
