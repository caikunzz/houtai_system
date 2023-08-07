<template>
  <el-dialog v-model="shows" width="330">
    <template #header>
      <span v-if="process.project" class="text-[18px] text-[#303133]">添加项目</span>
      <span v-if="process.set" class="text-[18px] text-[#303133]">编辑模板</span>
      <span v-else class="text-[18px] text-[#303133]">添加模板</span>
    </template>
    <template #default>
      <el-dialog v-model="innerVisible" width="800" title="Inner Dialog" append-to-body>
        <template #header>
          <span class="text-[18px] text-[#303133]">裁剪图片</span>
        </template>
        <imgs @change="test"></imgs>
      </el-dialog>
    </template>
    <template #footer>
      <div class="w-[100%] px-[20px] pb-[10px] border-b-[1px]">
        <el-button
          :plain="true"
          size="large"
          class="w-[100%]"
          :style="[btnImg === undefined ? '' : `background:url(${btnImg}) no-repeat`, 'height:162px']"
          @click="innerVisible = true"
        >
          <span v-if="btnImg === undefined" class="text-[#606266] flex items-center"
            ><el-icon class="text-[30px]"><Plus /></el-icon>添加封面</span
          >
        </el-button>
        <el-form ref="formRef" :model="numberValidateForm" class="demo-ruleForm mt-[25px]">
          <el-form-item
            prop="input"
            :rules="[
              { required: true, message: '请输入名称' },
              { type: 'string', message: '请输入名称' },
            ]"
          >
            <el-input
              v-model="numberValidateForm.input"
              autocomplete="off"
              :placeholder="process.project === true ? '项目名称 (必选)' : '模板名称 (必选)'"
              :style="{ height: '40px' }"
            />
          </el-form-item>
          <el-form-item v-if="process.project">
            <el-select v-model="value" class="w-[100%]" placeholder="请选择项目模板" size="default">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="numberValidateForm.textarea"
              autocomplete="off"
              :rows="2"
              type="textarea"
              :placeholder="process.project === true ? '项目简介' : '模板简介'"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="mr-[10px] px-[20px] pt-[20px]">
        <el-button v-if="process.project" type="primary" size="large" @click="submitForm"> 确定 </el-button>
        <el-button v-else-if="process.set" type="primary" size="large" @click="submitFormPut"> 确定 </el-button>
        <el-button v-else type="primary" size="large" @click="putProjects"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import type { FormInstance } from 'element-plus';
import imgs from '@/components/imgSet.vue';
import projectApi from '@/api/modules/project';

const shows = ref(false);
const resData = ref();
const formRef = ref<FormInstance>();
const btnImg = ref();
const innerVisible = ref(false);
const project = ref(false);
const process = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Boolean,
    default: false,
  },
  set: {
    type: Boolean,
    default: false,
  },
  img: {
    type: String,
    default: '',
  },
  str: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  data: {
    type: Object,
    default: null,
  },
});
const emits = defineEmits(['change']);
const bol = (bols: boolean) => {
  emits('change', bols);
};
const numberValidateForm = reactive({
  input: '',
  textarea: '',
});
watch(
  () => process.img,
  (newValue) => {
    // 在属性值变化时执行相应的操作
    btnImg.value = newValue;
  },
);
const dataVal = ref();
watch(
  () => process.data,
  (newValue) => {
    // 在属性值变化时执行相应的操作
    dataVal.value = newValue;
  },
);
watch(
  () => process.text,
  (newValue) => {
    // 在属性值变化时执行相应的操作
    numberValidateForm.textarea = newValue;
  },
);
watch(
  () => process.str,
  (newValue) => {
    // 在属性值变化时执行相应的操作
    numberValidateForm.input = newValue;
  },
);
watch(
  () => process.show,
  (newValue) => {
    // 在属性值变化时执行相应的操作
    shows.value = newValue;
  },
);
watch(
  () => shows.value,
  (newValue) => {
    if (newValue === false) {
      bol(false);
    }
  },
);
// 下拉菜单
const value = ref('');
const options: any = [];
projectApi
  .getprojectTemplates({
    limit: 1000,
    offset: 0,
  })
  .then((res) => {
    // eslint-disable-next-line array-callback-return
    res.data.rows.map((_obj: any) => {
      options.push({
        value: _obj.id,
        label: _obj.name,
      });
    });
    return res;
  });
const cover = ref();
// 错误时的信息
const open3 = (tle: string, msg: string) => {
  ElNotification({
    title: tle,
    dangerouslyUseHTMLString: true,
    message: `<div class="flex justify-between items-center text-[16px] font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><rect x="0" y="0" width="32" height="32" fill="none" stroke="none" /><path fill="red" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2zm5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4l-1.6 1.6z"/></svg>
        <p>${msg}<p>
      <div>`,
    position: 'bottom-left',
  });
};
const submitForm = () => {
  if (numberValidateForm.input !== '') {
    const data = {
      cover: cover.value,
      id: '',
      intro: numberValidateForm.input,
      name: numberValidateForm.textarea,
    };
    projectApi
      .postProject_templates(data)
      .then((res: any) => {
        if (res.data.code !== 0) {
          open3(`code码:${res.code}`, `${res.msg}`);
        } else {
          console.log(res);
          shows.value = false;
          btnImg.value = '';
          numberValidateForm.input = '';
          numberValidateForm.textarea = '';
        }
      })
      .catch((err) => {
        open3(`错误`, `${err}`);
      });
  }
};
const putProjects = () => {
  if (numberValidateForm.input !== '' && value.value !== '') {
    const data = {
      cover: cover.value,
      id: '',
      intro: numberValidateForm.input,
      name: numberValidateForm.textarea,
      project_template_id: value.value,
    };
    projectApi.newPutProjects(data).then((res) => {
      ElMessage({
        message: res.data.msg,
        type: 'success',
      });
    });
  }
};
const openArchive: any = inject('open401');
const submitFormPut = () => {
  if (numberValidateForm.input !== '') {
    shows.value = false;
    dataVal.value.name = numberValidateForm.input;
    dataVal.value.intro = numberValidateForm.textarea;
    if (cover.value !== undefined) {
      dataVal.value.cover = cover.value;
    }
    projectApi
      .putTem(dataVal.value)
      .then((res) => {
        ElMessage({
          message: res.data.msg,
          type: 'success',
        });
      })
      .catch((error: any) => {
        console.error(error);
        if (error.response && error.response.status === 400) {
          openArchive('错误', '名称重复');
        }
      });
  }
};
const test = (val: any) => {
  innerVisible.value = val.bol;
  btnImg.value = `http://192.168.122.36:1024/${val.val}`;
  cover.value = val.val;
};
</script>
