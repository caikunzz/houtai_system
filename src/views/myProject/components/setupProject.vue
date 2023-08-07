<template>
  <el-dialog v-model="dialogVisible" title="项目设置" width="660">
    <div class="py-[20px] text-[14px]">
      <el-tabs :tab-position="'left'" style="height: 580px" class="demo-tabs">
        <el-tab-pane class="overflow-auto">
          <template #label>
            <el-icon><Histogram /></el-icon>
            <span class="text-[#30133] ml-[3px]">概览</span>
          </template>
          <el-dialog v-model="innerVisible" width="800" title="Inner Dialog" append-to-body>
            <template #header>
              <span class="text-[18px] text-[#303133]">裁剪图片</span>
            </template>
            <imgs @change="test"></imgs>
          </el-dialog>
          <div class="px-[10px] text-[#606266] text-[14px]">
            <div class="h-[28px] font-medium">
              <span>项目封面</span>
            </div>
            <el-button
              :plain="true"
              size="large"
              class="w-[290px]"
              :disabled="id"
              @click="innerVisible = true"
              :style="[bgimg === undefined ? '' : `background:url(${bgimg}) no-repeat`, 'height:162px']"
            >
              <span v-if="bgimg === undefined" class="text-[#606266] flex items-center"
                ><el-icon class="text-[30px]"><Plus /></el-icon>添加封面</span
              >
            </el-button>
            <el-form
              ref="formRef"
              :model="numberValidateForm"
              :rules="rules"
              class="demo-ruleForm mt-[15px] h-[400px] overflow-auto"
            >
              <div class="flex justify-between w-[100%]">
                <div>
                  <div class="font-medium mb-[5px]">
                    <span><i class="text-[red]">* </i>项目名称</span>
                  </div>
                  <el-form-item prop="input1">
                    <el-input
                      v-model="numberValidateForm.input1"
                      :disabled="id"
                      autocomplete="off"
                      placeholder="项目名称 (必选)"
                      :style="{ height: '28px', width: '220px' }"
                    />
                  </el-form-item>
                </div>
                <div>
                  <div class="font-medium mb-[5px]">
                    <span><i class="text-[red]">* </i>项目进度(%)</span>
                  </div>
                  <el-form-item prop="input2">
                    <el-input
                      v-model="numberValidateForm.input2"
                      :disabled="id"
                      autocomplete="off"
                      placeholder="项目进度(%) (必选)"
                      :style="{ height: '28px', width: '220px' }"
                    />
                  </el-form-item>
                </div>
              </div>

              <el-form-item>
                <div class="h-[28px] font-medium">
                  <span>项目简介</span>
                </div>
                <el-input
                  v-model="numberValidateForm.textarea"
                  :disabled="id"
                  autocomplete="off"
                  :rows="2"
                  type="textarea"
                  placeholder="项目简介"
                />
              </el-form-item>
              <el-form-item>
                <div class="w-[100%]">
                  <div class="h-[28px] font-medium">
                    <span>项目公开性</span>
                  </div>
                  <div class="w-[100%]">
                    <el-select v-model="value" :disabled="id" class="w-[100%]" placeholder="Select" size="default">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </el-form-item>
              <div class="font-medium text-[14px]">
                <p>项目拥有者</p>
                <div class="flex items-center mt-[5px]">
                  <img :src="userImg" alt="" class="w-[40px] h-[40px] rounded-[50%]" />
                  <span class="ml-[5px]">{{ username }}</span>
                </div>
                <div class="flex justify-end mt-[10px]">
                  <el-button :disabled="id" type="primary" class="h-[40px]" @click="submit">确定</el-button>
                </div>
              </div>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <el-icon><View /></el-icon>
            <span class="text-[#30133] ml-[3px]">项目偏好</span>
          </template>
          <div class="text-[14px] px-[10px] font-medium w-[100%]">
            <div class="flex justify-between items-center mb-[20px]">
              <span>自动更新项目进度</span>
              <el-switch
                v-model="switchs"
                :disabled="id"
                size="small"
                class="mr-[10px]"
                style="--el-switch-off-color: #909399"
              />
            </div>
            <div>
              <p>根据当前任务的完成情况自动计算项目进度。</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane>
          <template #label>
            <el-icon><MoreFilled /></el-icon>
            <span class="text-[#30133] ml-[3px]">更多</span>
          </template>
          <div class="px-[10px] font-medium">
            <div class="text-[14px] text-[#00000073]">
              <p class="text-[16px] text-[#606266] font-semibold">项目操作</p>
              <p class="mt-[15px]">您可以执行以下操作</p>
            </div>
            <div class="mt-[20px]">
              <el-button type="danger" :disabled="id" size="large" plain @click="sub">归档项目</el-button>
              <el-button type="danger" :disabled="ids" size="large" plain>退出</el-button>
              <el-button type="danger" :disabled="id" size="large" @click="recycle">移至回收站</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { MoreFilled, View, Histogram } from '@element-plus/icons-vue';
import type { FormInstance, FormRules } from 'element-plus';
import imgs from '@/components/imgSet.vue';
import projectApi from '@/api/modules/project';

const dialogVisible = ref(false);
const innerVisible = ref(false);
const bgimg = ref();
const cover = ref();
const switchs = ref(false);
const username = ref();
const userImg = ref();
const TeamLeader = ref();
const obj = ref(); // 项目数据
const myId = ref();
const ids = ref(false); // 判断是否是项目成员
const id = ref(false); // 判断是否是项目组长
// 表单数据
const numberValidateForm = reactive({
  input1: '',
  input2: '',
  textarea: '',
});
const formRef = ref<FormInstance>();
// 下拉菜单
const value = ref('');
const options = [
  {
    value: '私有项目（仅项目成员可查看和编辑）',
    label: '私有项目（仅项目成员可查看和编辑）',
  },
  {
    value: '公开项目（所有人都可通过链接访问，仅项目成员可编辑）',
    label: '公开项目（所有人都可通过链接访问，仅项目成员可编辑）',
  },
];
value.value = options[0].value;
// 组件参数
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Object,
    default: Object,
  },
});
// 向父级传参
const emits = defineEmits(['change']);
const bol = (bols: boolean) => {
  emits('change', bols);
};
projectApi
  .getUser_info()
  .then((res) => {
    console.log(res);
    myId.value = res.data.id;
  })
  .catch((err) => {
    return err;
  });
// 监听
watch(
  () => props.show,
  (val) => {
    dialogVisible.value = val;
  },
);
watch(
  () => props.id,
  (val: any) => {
    console.log(val);
    if (val.img1.startsWith('/')) {
      bgimg.value = `http://192.168.122.36:1024/${val.img1}`;
    } else {
      bgimg.value = val.img1;
    }
    if (val.private1 === 1) {
      value.value = options[0].value;
    } else {
      value.value = options[1].value;
    }
    numberValidateForm.input1 = val.name1;
    numberValidateForm.input2 = val.private1;
    numberValidateForm.textarea = val.Introduction1;
    obj.value = val.myobj;
    username.value = val.username1;
    if (val.userImg1.startsWith('/')) {
      userImg.value = `http://192.168.122.36:1024/${val.userImg1}`;
    } else {
      userImg.value = val.userImg1;
    }
    TeamLeader.value = val.member1;
    if (val.id === myId.value) {
      id.value = false;
    } else {
      id.value = true;
    }
    // eslint-disable-next-line array-callback-return, no-shadow
    TeamLeader.value.map((obj: any) => {
      if (obj.id === myId.value && val.id !== myId.value) {
        ids.value = false;
        return;
      }
      ids.value = true;
    });
  },
);
watch(
  () => dialogVisible.value,
  (val) => {
    if (val === false) {
      bol(false);
    }
    console.log(value.value);
  },
);
// 截图方法
const test = (val: any) => {
  console.log(val);
  innerVisible.value = val.bol;
  bgimg.value = `http://192.168.122.36:1024/${val.val}`;
  cover.value = val.val;
};

const validateText = (rule: any, val: any, callback: any) => {
  if (numberValidateForm.input1 === '') {
    callback(new Error('请输入项目名称'));
  } else if (numberValidateForm.input1 !== '') {
    callback();
  }
};
const validateText2 = (rule: any, val: any, callback: any) => {
  if (numberValidateForm.input2 === null || numberValidateForm.input2 === '') {
    callback(new Error('请输入项目进度'));
  } else if (parseInt(numberValidateForm.input2, 10) < 0 || parseInt(numberValidateForm.input2, 10) > 100) {
    callback(new Error('项目进度百分比最小为0，最大为100'));
  } else {
    callback();
  }
};
const rules = reactive<FormRules<typeof numberValidateForm>>({
  input1: [{ validator: validateText, trigger: 'blur' }],
  input2: [{ validator: validateText2, trigger: 'blur' }],
});
const myif = () => {
  if (bgimg.value !== undefined) {
    obj.value.cover = cover.value;
  }
  if (numberValidateForm.input1 !== '') {
    obj.value.intro = numberValidateForm.input1;
  }
  if (parseInt(numberValidateForm.input2, 10) > 0 && parseInt(numberValidateForm.input2, 10) <= 100) {
    obj.value.progress = parseInt(numberValidateForm.input2, 10);
  }
  obj.value.intro = numberValidateForm.textarea;
  if (value.value === '公开项目（所有人都可通过链接访问，仅项目成员可编辑）') {
    obj.value.is_private = 1;
  } else {
    obj.value.is_private = 0;
  }
};
const submit = () => {
  myif();
  console.log(obj.value);
  projectApi
    .putProjects(obj.value)
    .then((res: any) => {
      console.log(res);
      ElMessage({
        message: res.data.msg,
        type: 'success',
      });
    })
    .catch((err) => {
      return err;
    });
};
// 归档
const sub = () => {
  obj.value.is_archived = 1;
  ElMessageBox.confirm('你确定要归档此项目吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      submit();
    })
    .catch(() => {
      return false;
    });
};
// 回收
const recycle = () => {
  obj.value.is_recycle = 1;
  ElMessageBox.confirm('你确定要将此项目移至回收站吗?', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      submit();
    })
    .catch(() => {
      return false;
    });
};
</script>
<style>
.el-tabs--left .el-tabs__nav-wrap.is-left::after {
  height: 20% !important;
}
</style>
