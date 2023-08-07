<template>
  <div class="h-full bg-[#F1F1F1] p-7 flex flex-col">
    <!-- 用户信息部分 -->
    <div class="bg-[#fff] h-[120px] px-[30px] mb-[20px] flex items-center justify-between">
      <div class="flex">
        <!-- 头像部分 -->
        <div class="mr-5">
          <el-avatar :size="64" :src="user.avatar" />
        </div>
        <!-- 信息部分 -->
        <div class="flex flex-col justify-center">
          <p class="text-[20px] leading-[33px]">{{ greeting }}, {{ user.username }}，祝你开心每一天！</p>
          <p v-if="user.roles[0]" class="text-[14px] text-[#00000073] leading-[33px]">{{ user.roles[0].name }}</p>
        </div>
      </div>

      <!-- 项目总数 -->
      <div class="flex flex-col justify-center items-center">
        <p class="text-[14px] text-[#00000073]">项目总数</p>
        <p class="pt-3 text-[30px]">{{ datas.count }}</p>
      </div>
    </div>

    <!-- 进行中的项目 -->
    <div class="flex overflow-y-scroll no-scrollbar <lg:flex-col" style="height: calc(100% - 140px)">
      <!-- 左边24条数据 -->
      <div class="h-full bg-[#fff] mr-5 <lg:mr-0" style="flex: 2">
        <div class="h-[60px] flex items-center justify-between px-[20px]">
          <p>进行中的项目</p>
          <el-button link type="primary">全部项目</el-button>
        </div>
        <div class="overflow-y-scroll no-scrollbar" style="height: calc(100% - 114px)">
          <ul class="grid grid-cols-4">
            <li
              v-for="(data, index) in paginatedDatas.slice().reverse()"
              :key="index"
              class="border border-gray-300 relative overflow-hidden shadow-hover cursor-pointer p-[10px]"
              style="border-left: none"
            >
              <el-image
                :src="data.cover.startsWith('/') ? `http://192.168.122.36:1024${data.cover}` : data.cover"
                fit="cover"
                class="w-full h-[150px]"
              />
              <p class="truncate text-[14px] leading-[24px]">{{ data.name }}</p>
              <p class="truncate text-[12px] text-[#8C8C8C] leading-[24px]">
                {{ data.intro ? data.intro : '暂无介绍' }}
              </p>
              <el-progress :percentage="data.progress" :stroke-width="2" :show-text="false" class="my-2" />
              <div class="flex items-center justify-between">
                <p class="text-[14px] text-[#8C8C8C]">{{ data.creator.username }}</p>
                <p class="text-[14px] text-[#8C8C8C]">
                  {{
                    new Date(data.updated_at)
                      .toLocaleString('default', {
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                      .replace(/\//g, '月')
                      .replace(',', '日 ')
                  }}
                </p>
              </div>
              <!-- 定位的类容 -->
              <div
                class="absolute w-[100px] h-[40px] bg-[#7971FE] top-0 right-0 z-10 bg-blue-500 bg-opacity-80 text-white pt-5 transform translate-x-1/2 rotate-45 origin-top-center text-center text-sm mr-2"
              >
                <p class="pr-4">公开</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="flex justify-center my-[15px]">
          <div class="flex justify-between">
            <el-pagination
              small
              background
              layout="prev, pager, next"
              :total="datas.count"
              :page-size="12"
              :current-page="currentPage"
              @current-change="handlePageChange"
            >
            </el-pagination>
          </div>
        </div>
      </div>

      <!-- 右边我的任务 -->
      <div class="flex-1 bg-[#fff] <lg:mt-5">
        <div class="h-[60px] flex items-center justify-between border-b-1 px-5">
          <p>我执行的任务 - 1</p>
          <div class="w-[100px]">
            <el-select v-model="CompleteWhether" size="large">
              <el-option label="未完成" value="未完成" />
              <el-option label="以完成" value="以完成" />
            </el-select>
          </div>
        </div>
        <!-- 下面选项 -->
        <div>
          <el-tabs v-model="activeName" :stretch="true" class="px-5">
            <el-tab-pane label="我执行的" name="first">
              <div
                v-for="(item, index) in executed"
                :key="index"
                class="w-[100%] h-[60px] flex items-center justify-between"
                style="border-bottom: 1px solid #ccc"
              >
                <div class="flex items-center pl-3">
                  <div>
                    <el-tag v-if="item.task_priority_id === 2">普通</el-tag>
                    <el-tag v-if="item.task_priority_id === 5" type="danger">非常紧急</el-tag>
                    <el-tag v-if="item.task_priority_id === 4" type="warning">紧急</el-tag>
                  </div>
                  <p class="pl-3 text-[#569CEE] text-xs">{{ item.name }}</p>
                </div>
                <p class="pr-5 text-[#ccc] text-sm">{{ item.project.name }}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我参与的" name="second">
              <div
                v-for="(item, index) in participated"
                :key="index"
                class="w-[100%] h-[60px] flex items-center justify-between"
                style="border-bottom: 1px solid #ccc"
              >
                <div class="flex items-center pl-3">
                  <div>
                    <el-tag v-if="item.task_priority_id === 2">普通</el-tag>
                    <el-tag v-if="item.task_priority_id === 5" type="danger">非常紧急</el-tag>
                    <el-tag v-if="item.task_priority_id === 4" type="warning">紧急</el-tag>
                  </div>
                  <p class="pl-3 text-[#569CEE] text-xs">{{ item.name }}</p>
                </div>
                <p class="pr-5 text-[#ccc] text-sm">{{ item.project.name }}</p>
              </div>
            </el-tab-pane>
            <el-tab-pane label="我创建的" name="third">
              <div
                v-for="(item, index) in participated"
                :key="index"
                class="w-[100%] h-[60px] flex items-center justify-between"
                style="border-bottom: 1px solid #ccc"
              >
                <div class="flex items-center pl-3">
                  <div>
                    <el-tag v-if="item.task_priority_id === 2">普通</el-tag>
                    <el-tag v-if="item.task_priority_id === 5" type="danger">非常紧急</el-tag>
                    <el-tag v-if="item.task_priority_id === 4" type="warning">紧急</el-tag>
                  </div>
                  <p class="pl-3 text-[#569CEE] text-xs">{{ item.name }}</p>
                </div>
                <p class="pr-5 text-[#ccc] text-sm">{{ item.project.name }}</p>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <el-backtop :right="100" :bottom="100" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import homeApi from '@/api/modules/home';

// 用户数据
const user = ref<{
  avatar: string;
  username: string;
  roles: { name: string }[];
}>({
  avatar: '',
  username: '',
  roles: [
    {
      name: '',
    },
  ],
});
const CompleteWhether = ref('未完成');

// 初始条数
const datas = ref<{
  count: number;
  rows: {
    name: string;
    cover: string;
    intro: string;
    progress: number;
    creator: { username: string };
    updated_at: string;
  }[];
}>({
  count: 0,
  rows: [],
});

// 我执行的数据
const executed = ref([
  {
    name: String,
    project: {
      name: String,
    },
    task_priority_id: 0,
  },
]);

// 我参与的数据
const participated = ref([
  {
    name: String,
    project: {
      name: String,
    },
    task_priority_id: 0,
  },
]);

// 当前页数，默认为第一页
const currentPage = ref(1);

// 计算属性：每页显示12条数据
const paginatedDatas = computed(() => {
  const startIndex = (currentPage.value - 1) * 12;
  const endIndex = startIndex + 12;
  return datas.value.rows.slice(startIndex, endIndex);
});

onMounted(async () => {
  await homeApi
    .getUserInfo()
    .then((res) => {
      user.value = res.data;
    })
    .catch();

  await homeApi
    .RequestContent()
    .then((res) => {
      datas.value.count = res.data.count;
      datas.value.rows = res.data.rows;
    })
    .catch();

  // 我执行的数控
  await homeApi
    .IexecutedIt()
    .then((res) => {
      executed.value = res.data.rows;
    })
    .catch();

  // 我参与的数据
  await homeApi
    .IparticipatedIn()
    .then((res) => {
      participated.value = res.data.rows;
    })
    .catch();

  currentPage.value = 1;
});

// 根据分页组件的页码变化更新 currentPage 变量的值
const handlePageChange = (val: number) => {
  currentPage.value = val;
};

// 问候语
const greeting = ref('');
const currentHour = new Date().getHours();
if (currentHour >= 0 && currentHour < 12) {
  greeting.value = '上午好';
} else if (currentHour >= 12 && currentHour < 18) {
  greeting.value = '下午好';
} else {
  greeting.value = '晚上好';
}
// 右边任务条
const activeName = ref('first');
</script>

<style lang="scss" scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.shadow-hover {
  transition: box-shadow 0.3s; /* 添加过渡效果 */
}
.shadow-hover:hover {
  box-shadow: 0 0 18px rgba(39, 37, 37, 0.3); /* 设置阴影样式 */
}
</style>
