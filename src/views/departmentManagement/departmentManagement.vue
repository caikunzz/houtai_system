<template>
  <div class="h-full flex justify-center p-5">
    <el-card shadow="always" :body-style="{ width: '100%' }" class="w-full bg-white flex">
      <div class="h-full flex">
        <div class="border-r-1">
          <el-input
            v-model="keyword"
            size="large"
            placeholder="输入'用户名/邮箱'回车搜索"
            prefix-icon="Search"
            class="pr-5"
            @blur="SelectData"
          />
          <el-menu
            default-active="keyword"
            class="border-0 overflow-y-scroll no-scrollbar"
            style="height: calc(100% - 40px)"
            @select="DefineSelect"
          >
            <h5 class="pt-[20px] pb-[10px] text-sm text-[#00000073]">成员</h5>
            <el-menu-item index="keyword">
              <el-icon>
                <i-akar-icons-people-group />
              </el-icon>
              <span>所有成员</span>
            </el-menu-item>
            <el-menu-item index="date_after_created">
              <el-icon>
                <i-ant-design-usergroup-add-outlined />
              </el-icon>
              <span>新加入的成员</span>
            </el-menu-item>
            <el-menu-item index="0">
              <el-icon><i-uiw-user /></el-icon>
              <span>未分配部门的成员</span>
            </el-menu-item>
            <el-menu-item index="state">
              <el-icon>
                <i-ri-user-forbid-line />
              </el-icon>
              <span>停用的成员</span>
            </el-menu-item>
            <h5 class="pt-[20px] pr-5 pb-[10px] text-sm text-[#00000073] flex justify-between items-center">
              <span>部门</span>
              <p class="flex items-center">
                <el-icon><CirclePlus /></el-icon>
                <span>创建部门</span>
              </p>
            </h5>
            <el-menu-item v-for="(item, index) in Deparments" :key="index" :index="String(item.id)">
              <el-icon>
                <i-mingcute-department-line />
              </el-icon>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </div>
        <div class="flex-1">
          <h4 class="h-[40px] leading-[40px] ml-5 border-b-1 text-[#333333] text-lg">{{ Title }}</h4>
          <ul class="ml-5 overflow-y-scroll no-scrollbar" style="height: calc(100% - 40px)">
            <li v-for="(item, index) in Table" :key="index" class="flex items-center py-5 border-b-1">
              <el-avatar :size="50" :src="item.avatar" />
              <div class="ml-5 flex-1">
                <p class="text-[#303133] text-sm cursor-pointer hover:text-[#1BA7F2]" @click="OpenDialog(item.id)">
                  {{ item.username }}
                </p>
                <p class="text-[#00000073] text-xs">
                  <span class="mr-3">{{ item.email }}</span>
                  <span v-if="item.department">{{ item.department.name }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
  <el-dialog v-model="dialog" :title="FormDetail.username + '详细信息'" center align-center destroy-on-close draggable>
    <div class="flex flex-col items-center">
      <el-avatar :size="64" :src="FormDetail.avatar" />
      <p class="my-7">{{ FormDetail.username }}</p>
    </div>
    <el-divider content-position="left">
      <div class="flex items-center text-[#00000073]">
        <el-icon><Suitcase /></el-icon>
        <span class="ml-3">工作信息</span>
      </div>
    </el-divider>
    <ul>
      <li class="flex py-5">
        <div class="w-[80px] text-[#00000073]">昵称</div>
        <div class="flex-1">{{ FormDetail.nickname }}</div>
      </li>
      <li class="flex py-5">
        <div class="w-[80px] text-[#00000073]">职位</div>
        <div class="flex-1">{{ FormDetail.company }}</div>
      </li>
      <li class="flex py-5">
        <div class="w-[80px] text-[#00000073]">邮箱</div>
        <div class="flex-1">{{ FormDetail.email }}</div>
      </li>
      <li class="flex py-5">
        <div class="w-[80px] text-[#00000073]">手机</div>
        <div class="flex-1">{{ FormDetail.phone }}</div>
      </li>
      <li class="flex py-5">
        <div class="w-[80px] text-[#00000073]">部门</div>
        <div class="flex-1">
          <span v-if="FormDetail.department !== null">{{ FormDetail.department.name }}</span>
          <span>-</span>
        </div>
      </li>
      <li class="flex py-5">
        <div class="w-[80px] text-[#00000073]">城市</div>
        <div class="flex-1">{{ FormDetail.city }}</div>
      </li>
    </ul>
  </el-dialog>
</template>

<script lang="ts" setup>
import DepartmentApi from '@/api/modules/department';

const keyword = ref(''); // 搜索框搜索条件
const Deparments = ref([]); // 所有部门
const Title = ref(''); // 当前标题
const Table = ref([]); // 展示表格
const SelectRule = ref({}); // 筛选数据条件
const dialog = ref(false); // 是否展示弹框
const FormDetail = ref({
  username: '',
}); // 弹框详情信息

// 筛选搜索数据
const SelectData = async () => {
  const res = await DepartmentApi.getPeople({ keyword: keyword.value, ...SelectRule.value });
  Table.value = res.data.rows;
};

onMounted(async () => {
  // 获取初始部门数据
  const res = await DepartmentApi.getDepartments();
  Deparments.value = res.data.rows;
  SelectData();
});

// 菜单选项发生改变时的回调函数
const DefineSelect = (index: string, indexPath: string[], item: object) => {
  SelectRule.value = {};
  if (index === 'keyword') {
    SelectRule.value = {
      keyword: '',
    };
  } else if (index === 'date_after_created') {
    SelectRule.value = {
      date_after_created: '2023-07-03 00:00:00',
    };
  } else if (index === 'state') {
    SelectRule.value = {
      state: '0',
    };
  } else {
    SelectRule.value = {
      department_id: index,
    };
  }
  SelectData();
};

const OpenDialog = async (id: number) => {
  const res = await DepartmentApi.getUserDetail({ id });
  console.log(res);
  FormDetail.value = res.data;
  dialog.value = true;
};
</script>

<style scoped></style>
