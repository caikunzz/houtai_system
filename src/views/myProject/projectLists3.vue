<template>
  <ul
    v-if="archive.data.rows.length !== 0"
    :class="archive.data[currentPage2 - 1] === archive.data[archive.data.length - 1] ? 'h-[75vh]' : ''"
  >
    <li
      v-for="(item, index) in archive.data.rows[currentPage2 - 1]"
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
          <el-tooltip class="box-item" effect="dark" content="从归档项目中恢复" placement="top-start">
            <el-button :icon="RefreshLeft" circle @click="archives(item)" />
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="移至回收站" placement="top-start">
            <el-button :icon="Delete" circle @click="recycle(item)"> </el-button>
          </el-tooltip>
        </div>
      </div>
    </li>
  </ul>
  <el-pagination
    v-if="archive.data.rowslength !== 0"
    v-model:current-page="currentPage2"
    background
    layout="prev, pager, next"
    :total="archive.data.count"
    class="justify-center mt-[15px]"
  />
</template>
<script setup lang="ts">
import { Picture, RefreshLeft, Delete } from '@element-plus/icons-vue';
import router from '@/router/index';
import projectApi from '@/api/modules/project';

const currentPage2 = ref(1);

const archive: any = ref({
  code: Number,
  data: {
    count: Number || 0,
    rows: [],
  },
  msg: String,
});
const groupArray = (arr: [], groupSize: number) => {
  const result = Array.from({ length: Math.ceil(arr.length / groupSize) }, (_, index) =>
    arr.slice(index * groupSize, index * groupSize + groupSize),
  );
  return <[]>result;
};
const list = () => {
  projectApi
    .getProjectsList({
      collection: 0,
      is_archived: 1,
    })
    .then((res: any) => {
      archive.value.data = res.data;
      archive.value.data.rows = groupArray(res.data.rows.reverse(), 11);
      archive.value.code = res.code;
      archive.value.msg = res.msg;
    })
    .catch((err) => {
      console.log(err);
    });
};
list();
// 全局弹出提示
const openArchive: any = inject('open401');
// 回收
const recycle = (objs: any) => {
  const newobjs = objs;
  ElMessageBox.confirm('你确定要将此项目移至回收站吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then((res: any) => {
      newobjs.is_recycle = 1;
      projectApi
        .putProjects(newobjs)
        .then((ress: any) => {
          list();
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
// 归档
const archives = (objs: any) => {
  const newobjs = objs;
  ElMessageBox.confirm('你确定要将此项目移至回收站吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then((res: any) => {
      newobjs.is_archived = 0;
      projectApi
        .putProjects(newobjs)
        .then((ress: any) => {
          list();
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
