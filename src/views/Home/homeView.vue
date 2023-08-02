<template>
  <div class="bg-[#F1F1F1] min-w-1200px">
    <!-- 用户信息部分 -->
    <div class="w-[95%] h-[153px] bg-[#fff] flex mt-[20px] mx-auto">
      <!-- 头像部分 -->
      <div class="w-[90px] h-[90px] rounded-full overflow-hidden mt-[32px] ml-[20px]">
        <img :src="user.avatar" alt="" />
      </div>
      <!-- 信息部分 -->
      <div class="w-[614px] h-full ml-[20px] flex flex-col justify-center">
        <p class="text-[25px] pl-6">{{ greeting }}, {{ user.username }}，祝你开心每一天！</p>
        <p v-if="user.roles[0]" class="pt-3 pl-7">{{ user.roles[0].name }}</p>
      </div>

      <!-- 项目总数 -->
      <div class="w-[90px] h-[100%] bg-pink ml-[30%] flex flex-col justify-center items-center">
        <p class="text-center text-[16px]">项目总数</p>
        <p class="text-center pt-3 text-[25px]">{{ datas.count }}</p>
      </div>
    </div>

    <!-- 进行中的项目 -->
    <div class="w-[95%] mx-auto mt-[20px] bg-[#F1F1F1] flex justify-between">
      <!-- 左边24条数据 -->
      <div class="w-[960px] h-[100%] bg-[#fff]">
        <div class="w-[925px] h-[80px] flex items-center justify-between">
          <p class="pl-4">进行中的项目</p>
          <p class="pr-4 text-[#409EFF]">全部项目</p>
        </div>
        <!-- 下面的内容 -->
        <div class="w-full">
          <div class="w-[925px] flex flex-wrap">
            <div
              v-for="(data, index) in paginatedDatas.slice().reverse()"
              :key="index"
              class="w-[227px] h-[235px] border border-gray-300 relative overflow-hidden shadow-hover"
              style="border-left: none"
            >
              <div class="w-[100%] h-[130px] mt-[10px] overflow-auto">
                <img :src="`http://api.cc0820.top:1024${data.cover}`" alt="" class="w-[100%] h-[100%]" />
              </div>
              <p style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap" class="text-[20px] pt-1 pl-3">
                {{ data.name }}
              </p>
              <p class="text-[14px] text-[#8C8C8C] pt-1 pb-2 pl-3">
                {{ data.intro ? data.intro : '暂无介绍' }}
              </p>
              <el-progress :percentage="data.progress" :show-text="false" class="w-[95%] mx-auto" />
              <div class="w-full mt-2 flex items-center justify-between">
                <p class="text-[14px] text-[#8C8C8C] pt-1 pl-2">{{ data.creator.username }}</p>
                <p class="text-[14px] text-[#8C8C8C] pt-1 pr-2">
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
            </div>
          </div>
          <div class="flex justify-center mt-4">
            <div class="flex justify-between w-[100%] max-w-[300px] mb-6">
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
      </div>

      <!-- 右边我的任务 -->
      <div class="w-[400px] h-[600px] bg-[#fff]">
        <div class="w-full h-[70px] flex items-center justify-between" style="border-bottom: 1px solid #ccc">
          <p class="pl-3">我执行的任务 - 1</p>
          <div
            class="w-[100px] h-[35px] mr-3 flex items-center"
            style="border: 1px solid #ccc; border-radius: 5px; justify-content: space-evenly"
          >
            <el-col class="pl-4 pt-3">
              <span class="demonstration"></span>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link flex items-center w-full">
                  <p class="w-[70%]">未完成</p>
                  <el-icon class="el-icon--right"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>以完成</el-dropdown-item>
                    <el-dropdown-item> 未完成</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </div>
        </div>
        <!-- 下面选项 -->
        <div class="w-[90%] mx-auto">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="我执行的" name="first">
              <div
                v-for="(item, index) in executed"
                :key="index"
                class="w-[100%] h-[60px] flex items-center justify-between"
                style="border-bottom: 1px solid #ccc"
              >
                <div class="flex items-center pl-3">
                  <div class="flex items-center">
                    <div
                      v-if="item.task_priority_id === 2"
                      class="pl-3 pr-3"
                      style="border: 1px solid #409eff; color: #409eff; border-radius: 5px"
                    >
                      普通
                    </div>
                    <div
                      v-if="item.task_priority_id === 5"
                      class="pl-3 pr-3"
                      style="border: 1px solid red; color: red; border-radius: 5px"
                    >
                      非常紧急
                    </div>
                    <div
                      v-if="item.task_priority_id === 4"
                      class="pl-3 pr-3"
                      style="border: 1px solid #fa8c15; color: #fa8c15; text-align: center; border-radius: 5px"
                    >
                      紧急
                    </div>
                  </div>
                  <p class="pl-3 text-[#569CEE]">{{ item.name }}</p>
                </div>
                <P class="pr-5 text-[#ccc]">{{ item.project.name }}</P>
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
                  <div
                    v-if="item.task_priority_id === 2"
                    class="pl-3 pr-3"
                    style="border: 1px solid #409eff; color: #409eff; border-radius: 5px"
                  >
                    普通
                  </div>
                  <div
                    v-if="item.task_priority_id === 5"
                    class="pl-3 pr-3"
                    style="border: 1px solid red; color: red; border-radius: 5px"
                  >
                    非常紧急
                  </div>
                  <div
                    v-if="item.task_priority_id === 4"
                    class="pl-3 pr-3"
                    style="border: 1px solid #fa8c15; color: #fa8c15; text-align: center; border-radius: 5px"
                  >
                    紧急
                  </div>
                  <p class="pl-3 text-[#569CEE]">{{ item.name }}</p>
                </div>
                <P class="pr-5 text-[#ccc]">{{ item.project.name }}</P>
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
                  <div class="flex items-center">
                    <div
                      v-if="item.task_priority_id === 2"
                      class="pl-3 pr-3"
                      style="border: 1px solid #409eff; color: #409eff; border-radius: 5px"
                    >
                      普通
                    </div>
                    <div
                      v-if="item.task_priority_id === 5"
                      class="pl-3 pr-3"
                      style="border: 1px solid red; color: red; border-radius: 5px"
                    >
                      非常紧急
                    </div>
                    <div
                      v-if="item.task_priority_id === 4"
                      class="pl-3 pr-3"
                      style="border: 1px solid #fa8c15; color: #fa8c15; text-align: center; border-radius: 5px"
                    >
                      紧急
                    </div>
                  </div>
                  <p class="pl-3 text-[#569CEE]">{{ item.name }}</p>
                </div>
                <P class="pr-5 text-[#ccc]">{{ item.project.name }}</P>
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
  },
]);

// 我参与的数据
const participated = ref([
  {
    name: String,
    project: {
      name: String,
    },
    task_priority_id: Number,
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
      console.log(datas.value);
    })
    .catch();

  // 我执行的数控
  await homeApi
    .IexecutedIt()
    .then((res) => {
      executed.value = res.data.rows;
      console.log(executed.value);
    })
    .catch();

  // 我参与的数据
  await homeApi
    .IparticipatedIn()
    .then((res) => {
      participated.value = res.data.rows;
      console.log(participated.value);
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
