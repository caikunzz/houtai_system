<template>
  <div class="h-[65px] px-[40px] flex bg-white shadow-lg shadow-[#ccc]">
    <div class="flex items-center">
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
    <el-menu
      :default-active="MenuActive"
      clas
      class="el-menu-demo ml-10 flex-1"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">
        <div @click="router.push('/')">
          <el-icon>
            <Monitor size="18px" />
          </el-icon>
          <span>工作台</span>
        </div>
      </el-menu-item>
      <el-menu-item index="2">
        <div @click="router.push('/Home/projectManagement/projectLists/1')">
          <el-icon>
            <Histogram />
          </el-icon>
          <span>项目</span>
        </div>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon>
          <Stamp />
        </el-icon>
        <span>部门</span>
      </el-menu-item>
    </el-menu>
    <div class="flex">
      <ul class="flex p-0 m-0">
        <li class="flex items-center px-[20px] cursor-pointer">
          <el-icon :size="20">
            <i-octicon-people-16 />
          </el-icon>
        </li>
        <li class="flex items-center px-[20px] cursor-pointer">
          <i-bi-bell />
        </li>
        <li class="flex items-center pl-[20px] cursor-pointer">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">user </el-avatar>
          <span>user</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import router from '@/router/index.ts';

const MenuActive = ref('1');

const handleSelect = () => {
  console.log(1);
};
</script>

<style scoped></style>
