<template>
  <ul
    v-if="deletes.data.rows.length !== 0"
    :class="deletes.data.rows[currentPage3 - 1] === deletes.data.rows[deletes.data.rows.length - 1] ? 'h-[75vh]' : ''"
  >
    <li
      v-for="(item, index) in deletes.data.rows[currentPage3 - 1]"
      :key="index"
      class="flex justify-between p-[10px] font-medium"
    >
      <div class="flex w-[398px]">
        <img
          v-if="item.cover !== ''"
          :src="
            item.cover.includes('http://192.168.122.36:1024')
              ? `http://192.168.122.36:1024${item.cover}`
              : `http://192.168.122.36:1024${item.cover}`
          "
          alt=""
          class="w-[50px] h-[50px]"
        />
        <div v-else class="w-[50px] h-[50px] flex justify-center items-center">
          <el-icon><Picture /></el-icon>
        </div>
        <div class="h-[32px] ml-[10px]">
          <div class="flex items-center h-[100%] font-medium">
            <span class="text-[#1890ff]">{{ item.name }}</span>
            <el-tag v-if="item.is_private === 0" class="ml-2" type="success" size="large">公开</el-tag>
          </div>
          <p class="h-[25px] flex items-center text-[#00000073] font-medium">{{ item.intro }}</p>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="w-[150px]">
          <p>创建日期</p>
          <p>{{ item.created_at.split(' ')[0] }}</p>
        </div>
        <div class="w-[120px]">
          <p>创建人</p>
          <p>{{ item.creator.username }}</p>
        </div>
        <div class="w-[200px]">
          <p>进度</p>
          <el-progress :percentage="item.progress" />
        </div>
        <div class="w-[160px] flex justify-end">
          <el-tooltip class="box-item" effect="dark" content="从回收站中恢复项目" placement="top-start">
            <el-button :icon="RefreshLeft" circle @click="recycle(item)" />
          </el-tooltip>
        </div>
      </div>
    </li>
  </ul>
  <el-pagination
    v-if="deletes.data.rows.length !== 0"
    v-model:current-page="currentPage3"
    background
    layout="prev, pager, next"
    :total="deletes.data.count"
    class="justify-center mt-[15px]"
  />
</template>
<script setup lang="ts">
import { Picture, RefreshLeft } from '@element-plus/icons-vue';
import router from '@/router/index';
import projectApi from '@/api/modules/project';

const currentPage3 = ref(1);

type T = {
  code: number;
  data: {
    count: number;
    rows: any;
  };
  msg: string;
};
const deletes: any = ref({
  code: 0,
  data: {
    count: 0,
    rows: [],
  },
  msg: '',
});
const groupArray = (arr: [], groupSize: number) => {
  const result = Array.from({ length: Math.ceil(arr.length / groupSize) }, (_, index) =>
    arr.slice(index * groupSize, index * groupSize + groupSize),
  );
  return <[]>result;
};

const deletList = () => {
  projectApi
    .getProjectsList({
      collection: 0,
      is_recycle: 1,
    })
    .then((res: T) => {
      deletes.value.data = res.data;
      deletes.value.data.rows = groupArray(res.data.rows.reverse(), 11);
      deletes.value.code = res.code;
      deletes.value.msg = res.msg;
    })
    .catch((err) => {
      console.log(err);
    });
};
deletList();
// 回收
const openArchive: any = inject('open401');
const recycle = (objs: any) => {
  const newobjs = objs;
  ElMessageBox.confirm('你确定要将此项目移至回收站吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then((res: any) => {
      newobjs.is_recycle = 0;
      projectApi
        .putProjects(newobjs)
        .then((ress: any) => {
          deletList();
          ElMessage({
            message: ress.data.msg,
            type: 'success',
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            router.push({
              name: '401',
            });
            openArchive('无权限', '只有项目拥有者才能修改项目信息');
          }
        });
    })
    .catch(() => {
      return false;
    });
};
</script>
