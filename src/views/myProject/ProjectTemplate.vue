<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleClick">
    <el-tab-pane label="自定义模板" name="1">
      <div
        v-for="(item, index) in dataList2"
        :key="index"
        class="flex border-solid border-b-[1px] border-[#00000050] justify-between items-center py-[12px] font-medium text-[14px] text-[#00000073]"
      >
        <div class="flex">
          <div class="w-[50px] h-[50px] flex justify-center items-center">
            <img
              v-if="item.cover !== ''"
              :src="`${item.cover.startsWith('/') ? `http://192.168.122.36:1024/${item.cover}` : item.cover}`"
              alt=""
              class="w-[50px] h-[50px]"
            />
            <el-icon v-else><Picture /></el-icon>
          </div>
          <div class="w-[160px] ml-[10px] flex flex-col justify-center">
            <span class="h-[25px] leading-[25px]">{{ item.name }}</span>
            <span class="h-[25px] leading-[25px]">{{ item.intro }}</span>
          </div>
        </div>
        <div class="w-[75%] flex justify-end items-center">
          <div
            v-for="(items, indexs) in item.project_template_tasks"
            :key="indexs"
            class="flex justify-between items-center"
          >
            <span class="flex items-center justify-between mr-[10px]">{{ items.name }} </span>
            <el-icon v-if="indexs !== item.project_template_tasks.length - 1" class="mr-[10px]"><Right /></el-icon>
          </div>
          <div class="flex justify-between items-center">
            <el-button :icon="Grid" circle @click="getlist(item.id)" />
            <el-button :icon="EditPen" circle @click="setTem(item)" />
            <el-button :icon="Delete" circle @click="open(item.id)" />
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="公共模板" name="2">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="flex py-[12px] font-medium text-[14px] text-[#00000073]"
      >
        <div class="w-[50px] h-[50px] flex justify-center items-center">
          <el-icon><Picture /></el-icon>
        </div>
        <div class="w-[160px] ml-[10px]">
          <span>{{ item.name }}</span>
        </div>
        <div class="w-[75%] pr-[40px] flex justify-end items-center">
          <div class="flex justify-between items-center">
            <div
              v-for="(items, indexs) in item.project_template_tasks"
              :key="indexs"
              class="flex justify-between items-center mr-[6px]"
            >
              <span>{{ items.name }} &nbsp; </span>
              <el-icon v-if="indexs !== item.project_template_tasks.length - 1"><Right /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  <el-button
    type="primary"
    :icon="Plus"
    size="large"
    class="absolute right-6 top-[.75rem] h-[40px]"
    @click="centerDialogVisible = !centerDialogVisible"
    >创建项目模板</el-button
  >
  <plugInUnit :outer-visible="bool" :list="listData" @change="plugInUnitVals" />
  <Templates :show="centerDialogVisible" @change="val" />
  <Templates
    :show="centerDialogVisible2"
    :set="true"
    :str="str"
    :img="bgimg"
    :text="text"
    :data="data"
    @change="val2"
  />
</template>
<script setup lang="ts">
import { Plus, Grid, EditPen, Delete } from '@element-plus/icons-vue';
import type { TabPaneName } from 'element-plus';
import projectApi from '@/api/modules/project';
import Templates from '@/views/myProject/components/createTemplate.vue';
import plugInUnit from '@/views/myProject/components/plugInUnit.vue';

const activeName = ref('1');
const dataList = ref();
const dataList2 = ref();
const centerDialogVisible = ref(false);
const centerDialogVisible2 = ref(false);
const bool = ref(false);
const listData = ref(); // 模板列表数据
const str = ref();
const text = ref();
const bgimg = ref();
const data = ref();
const getlist = (id: number) => {
  bool.value = true;
  listData.value = id;
};
// eslint-disable-next-line no-shadow
const setTem = (val: any) => {
  centerDialogVisible2.value = true;
  if (val.cover.startsWith('/')) {
    const img = `http://192.168.122.36:1024${val.cover}`;
    bgimg.value = img;
  } else {
    bgimg.value = val.cover;
  }
  str.value = val.name;
  text.value = val.intro;
  data.value = val;
};
const plugInUnitVals = (val: any) => {
  console.log(val);

  bool.value = val;
};
const init = (name: string | number) => {
  if (name === '2') {
    projectApi
      .getprojectTemplates({ is_custom: 0, limit: 1000, offset: 0 })
      .then((res) => {
        if (res.msg === '请求成功') {
          dataList.value = res.data.rows;
          console.log(dataList.value);
        }
      })
      .catch((err) => {
        console.log(`项目模板错误：${err}`);
      });
  } else if (name === '1') {
    projectApi
      .getprojectTemplates({ is_custom: 1, limit: 1000, offset: 0 })
      .then((res) => {
        if (res.msg === '请求成功') {
          dataList2.value = res.data.rows;
        }
      })
      .catch((err) => {
        console.log(`项目模板错误：${err}`);
      });
  }
};
init(activeName.value);
const handleClick = (name: TabPaneName) => {
  init(name);
};
const val = (res: boolean) => {
  centerDialogVisible.value = res;
  projectApi
    .getprojectTemplates({ is_custom: 1, limit: 1000, offset: 0 })
    .then((ress) => {
      if (ress.msg === '请求成功') {
        dataList2.value = ress.data.rows;
      }
    })
    .catch((err) => {
      console.log(`项目模板错误：${err}`);
    });
};
const val2 = (res: boolean) => {
  centerDialogVisible2.value = res;
  init(activeName.value);
};

const open = (vals: any) => {
  ElMessageBox.confirm('你确定要删除当前项吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then((res) => {
      console.log(vals);
      projectApi
        .deleteTem({ data: { ids: [vals] } })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          });
          projectApi
            .getprojectTemplates({ is_custom: 1, limit: 1000, offset: 0 })
            .then((ress) => {
              if (ress.msg === '请求成功') {
                dataList2.value = ress.data.rows;
              }
            })
            .catch((err) => {
              console.log(`项目模板错误：${err}`);
            });
        })
        .catch((err) => {
          ElMessage({
            type: 'success',
            message: '删除失败',
          });
        });
    })
    .catch((err) => {
      return err;
    });
};
</script>
<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.el-dialog__body {
  padding: 0;
}
.el-dialog__footer {
  padding: 0;
}
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  height: 20% !important;
}
.el-dialog {
  overflow: hidden !important;
}
.el-dialog__body {
  border-top: 1px solid #dcdfe6 !important;
  padding: 10px 20px !important;
}
.el-dialog__footer {
  padding: 10px 0px 20px 0px !important;
}
</style>
