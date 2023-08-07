<template>
  <el-dialog v-model="outerVisible" width="50%" title="「ovo」任务列表">
    <div class="w-[100%] flex justify-end">
      <el-button type="primary" size="large" class="mr-[20px]" @click="innerVisible = true"> + 添加任务 </el-button>
    </div>
    <div class="px-[20px]">
      <ul class="pb-[30px]">
        <li
          v-for="(item, index) in listdata"
          :key="index"
          class="py-[12px] flex justify-between border-solid border-b-[1px] border-[#ccc]"
        >
          <div class="w-[160px]">
            <p class="h-[25px] w-[100%]">{{ item.name }}</p>
            <p class="h-[25px] w-[100%]">排序：{{ item.sort }}</p>
          </div>
          <div class="w-[90px] h-[50px] flex items-center">
            <el-button :icon="EditPen" size="small" circle @click="setInnerVisible(item)" />
            <el-button :icon="Delete" size="small" circle class="ml-[10px]" @click="deleteList(item.id)" />
          </div>
        </li>
      </ul>
    </div>
  </el-dialog>
  <el-dialog v-model="innerVisible" width="330px" title="添加任务模板" append-to-body>
    <div class="py-[20px] pb-[30px] boredr-b-[1px] border-solid border-[#606266]">
      <el-form ref="formRef" :model="dynamicValidateForm" class="demo-dynamic pr-[30px]">
        <el-form-item class="m-0 w-[100%]" name="input1">
          <el-input v-model="dynamicValidateForm.input1" size="large" placeholder="模板任务名称(必填)" />
        </el-form-item>
        <el-form-item name="input2">
          <el-input v-model="dynamicValidateForm.input2" size="large" placeholder="0"></el-input>
        </el-form-item>
      </el-form>
      <p class="pt-4">排序,值越大越靠前,默认0</p>
    </div>
    <template #footer>
      <div class="w-[100%] flex justify-end px-[20px] pt-[20px] pb-[0px] border-t border-solid border-[#e5e7eb]">
        <el-button size="large" type="primary" @click="sub">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { EditPen, Delete } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import projectApi from '@/api/modules/project';

const outerVisible = ref(false);
const innerVisible = ref(false);
const formRef = ref<FormInstance>();
// 表单数据
const dynamicValidateForm = reactive({
  input1: '',
  input2: '',
});
const porps = defineProps({
  outerVisible: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Number,
    default: null,
  },
});
const emits = defineEmits(['change']);
const bol = (bols: boolean) => {
  emits('change', bols);
};
watch(
  () => porps.outerVisible,
  (val: boolean) => {
    outerVisible.value = val;
  },
);
const listdata = ref();
const id = ref();
const getlist = (val: any) => {
  projectApi
    .getProject_template_tasks({
      project_template_id: val,
      prop_order: 'sort',
      order: 'desc',
      limit: 1000,
      offset: 0,
    })
    .then((res) => {
      listdata.value = res.data.rows;
    });
};
watch(
  () => porps.list,
  (val: number) => {
    id.value = val;
    getlist(val);
  },
);
watch(
  () => outerVisible.value,
  (newValue) => {
    if (newValue === false) {
      bol(false);
    }
  },
);
const openArchive: any = inject('open401');
const setget = ref(false);
const listid = ref();
const date = ref();
const sub = () => {
  if (dynamicValidateForm.input1 !== '' && setget.value === false) {
    projectApi
      .postProject_template({
        id: '',
        name: dynamicValidateForm.input1,
        project_template_id: id.value,
        sort: `${parseInt(dynamicValidateForm.input2, 10)}`,
      })
      .then((res: any) => {
        innerVisible.value = false;
        getlist(id.value);
        ElMessage({
          message: res.data.msg,
          type: 'success',
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          openArchive('422', '参数错误');
        }
      });
  } else if (dynamicValidateForm.input1 !== '' && setget.value === true) {
    projectApi
      .putProject_template({
        created_at: date.value.a,
        id: listid.value,
        name: dynamicValidateForm.input1,
        project_template_id: id.value,
        sort: parseInt(dynamicValidateForm.input2, 10),
        updated_at: date.value.b,
      })
      .then((res: any) => {
        innerVisible.value = false;
        setget.value = false;
        getlist(id.value);
        ElMessage({
          message: res.data.msg,
          type: 'success',
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 422) {
          openArchive('422', '参数错误');
        }
      });
  }
};
const setInnerVisible = (val: any) => {
  innerVisible.value = true;
  setget.value = true;
  listid.value = val.id;
  dynamicValidateForm.input1 = val.name;
  dynamicValidateForm.input2 = val.sort;
  date.value = {
    a: val.created_at,
    b: val.updated_at,
  };
};
const deleteList = (val: any) => {
  ElMessageBox.confirm('你确定要删除当前项吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then((res: any) => {
      projectApi
        .deleteProject_template({ data: { ids: [val] } })
        .then((ress: any) => {
          getlist(id.value);
          ElMessage({
            message: ress.data.msg,
            type: 'success',
          });
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            openArchive('无权限', '只有项目拥有者才能修改项目信息');
          }
        });
    })
    .catch(() => {
      return false;
    });
};
</script>
<style scoped>
.el-divider--horizontal {
  border: none;
  margin: 0;
}
.el-form-item__content {
  margin-left: 0 !important;
}
</style>
