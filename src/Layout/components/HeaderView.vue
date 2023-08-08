<template>
  <div class="h-[65px] px-[40px] flex bg-white shadow-lg shadow-[#ccc]">
    <div class="flex items-center" @click="router.push('/layout')">
      <svg data-v-74f95c37="" fill="none" height="36" width="36">
        <path
          clip-rule="evenodd"
          d="M12 31.5c11.375 0 19.5-9.035 19.5-19.787H24c0 6.892-5.045 12.284-12 12.284V31.5z"
          data-v-74f95c37=""
          fill="#16D2AC"
          fill-rule="evenodd"
        ></path>
        <path d="M4.5 4.5H12v19.508H4.5V4.5z" data-v-74f95c37="" fill="#165DFF"></path>
        <path d="M24 4.5v7.503H4.5V4.5H24zM31.5 4.5v7.503H24V4.5h7.5z" data-v-74f95c37="" fill="#165DFF"></path>
      </svg>
      <div>
        <span class="text-3xl font-semibold ml-2">Arco</span>
      </div>
    </div>
    <el-menu :default-active="MenuActive" router class="el-menu-demo ml-10 flex-1 border-0" mode="horizontal">
      <el-menu-item index="/">
        <div>
          <el-icon>
            <Monitor size="18px" />
          </el-icon>
          <span>工作台</span>
        </div>
      </el-menu-item>
      <el-menu-item index="/layout/projectManagement">
        <div>
          <el-icon>
            <Histogram />
          </el-icon>
          <span>项目</span>
        </div>
      </el-menu-item>
      <el-menu-item index="/layout/departmentManagement">
        <el-icon>
          <Stamp />
        </el-icon>
        <span>部门</span>
      </el-menu-item>
    </el-menu>
    <div class="flex">
      <ul class="flex p-0 m-0">
        <li class="flex items-center px-[20px] cursor-pointer">
          <el-badge :value="28" class="item" type="primary">
            <el-icon :size="20">
              <i-octicon-people-16 />
            </el-icon>
          </el-badge>
        </li>
        <!--消息通知-->
        <el-popover
          placement="top"
          :width="300"
          trigger="hover"
          content="this is content, this is content, this is content"
        >
          <template #reference>
            <li class="flex items-center px-[20px] cursor-pointer">
              <i-bi-bell />
            </li>
          </template>
          <el-tabs tab-position="top" :stretch="true">
            <el-tab-pane label="@我"><el-empty description="暂无" /></el-tab-pane>
            <el-tab-pane label="通知"><el-empty description="暂无" /></el-tab-pane>
            <el-tab-pane label="私信"><el-empty description="暂无" /></el-tab-pane>
          </el-tabs>
        </el-popover>
        <!--user-->
        <el-popover placement="top-start" trigger="hover" class="p-0">
          <template #reference>
            <li v-if="Info" class="flex items-center pl-[20px] cursor-pointer">
              <el-avatar :src="Info.avatar">user </el-avatar>
              <span class="ml-3">{{ Info.username }}</span>
            </li>
          </template>
          <div>
            <div class="flex flex-col">
              <el-button tag="a" text @click="router.push('/layout/inform')">
                <el-icon class="mr-2"><User /></el-icon>个人设置
              </el-button>
            </div>
            <div class="flex flex-col">
              <el-button tag="a" text @click="logout">
                <el-icon class="mr-2"><SwitchButton /></el-icon>退出登录
              </el-button>
            </div>
          </div>
        </el-popover>
      </ul>
    </div>
  </div>
</template>

<script setup>
import store from 'store';
import useStore from '@/store/index';
import router from '@/router';

const { user } = useStore();
const Info = ref(store.get('user_info')); // 获取本地存储用户信息
const MenuActive = ref('/');

// 退出登录
const logout = () => {
  ElMessageBox.alert('This is a message', 'Title', {
    confirmButtonText: 'OK',
    callback: (action) => {
      if (action === 'confirm') {
        user.logout();
        router.push('/login');
      }
    },
  });
};
</script>

<style scoped></style>
