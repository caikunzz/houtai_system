<template>
  <div class="flex flex-col w-100% justify-end">
    <div class="w-[100%] flex justify-end items-center">
      <el-form ref="formRef" :model="numberValidateForm" label-width="10px" class="p-1 demo-ruleForm flex w-[360px]">
        <el-form-item prop="age" class="w-[250px]">
          <el-input
            v-model="numberValidateForm.age"
            autosize
            size="large"
            type="text"
            autocomplete="off"
            placeholder="内容"
            class="w-[250px]"
          />
        </el-form-item>
        <el-form-item class="mr-0">
          <el-button class="mr-0" type="primary" autosize :icon="Search" size="large" @click="submitForm(formRef)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="内容">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <img :src="scope.row.date" alt="" class="w-[32px] h-[32px] rounded-[50%]" />
            <span style="margin-left: 5px">{{ scope.row.user }}</span>
            <span style="margin-left: 10px" v-html="scope.row.text"></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="时间" width="200" />
      <el-table-column prop="operate" label="操作" width="200">
        <template #default="scope">
          <span>
            <span class="project-name">查看</span>
            <span class="ml-[10px]" :class="scope.row.operate === 1 ? 'text-[#C0C4CC]' : ''">已读</span>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-center items-center mt-[15px]">
      <span class="mr-[10px]">共 {{ entry }} 条</span>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
        popper-class="'页'"
        background
        layout="sizes, prev, pager, next, jumper"
        :total="entry"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Search, Soccer } from '@element-plus/icons-vue';
import { reactive, ref } from 'vue';
import type { FormInstance } from 'element-plus';
import projectApi from '@/api/modules/project';

const currentPage = ref(1);
const pageSize = ref(10);
const entry = ref(0);
const formRef = ref<FormInstance>();

const numberValidateForm = reactive({
  age: '',
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
    return undefined;
  });
};
// 表格数据
const tableData = ref<any>([]);
projectApi.getUser_info().then((ress: any) => {
  projectApi
    .getMessages({
      prop_order: 'id',
      order: 'desc',
      pageNo: 1,
      pageSize: 10,
      keyword: null,
      type: 'personal',
      receiver_id: ress.data.id,
      limit: 10,
      offset: 0,
    })
    .then((res) => {
      console.log(res);
      for (let key = 0; key < res.data.rows.length; key += 1) {
        tableData.value.push({
          date: res.data.rows[key].actor.avatar,
          user: res.data.rows[key].actor.username,
          text: res.data.rows[key].content,
          time: res.data.rows[key].created_at,
          operate: res.data.rows[key].is_read,
        });
      }
    });
});
</script>
<style>
.project-name {
  color: #1b9aee;
  font-size: 14px;
}
</style>
