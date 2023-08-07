<template>
  <div class="w-full h-full mx-auto">
    <div class="flex justify-center">
      <div class="w-[70%] h-[100%] mt-[30px] bg-[#fff] flex items-center justify-between" style="border-radius: 10px">
        <div class="flex-1">
          <el-tabs tab-position="left" class="mt-4">
            <el-tab-pane v-model="activeTab" label="基本设置" class="flex items-center">
              <el-form
                :label-position="labelPosition"
                label-width="100px"
                :model="formLabelAlign"
                style="max-width: 460px"
                class="flex-1"
              >
                <el-form-item label="用户名">
                  <el-input v-model="formLabelAlign.name" disabled :placeholder="user.username" />
                </el-form-item>
                <el-form-item label="昵称">
                  <el-input v-model="formLabelAlign.region" />
                </el-form-item>
                <el-form-item label="邮箱">
                  <el-input v-model="formLabelAlign.email" disabled :placeholder="user.email" />
                </el-form-item>
                <el-form-item label="手机号">
                  <el-input v-model="formLabelAlign.phone" />
                </el-form-item>
                <el-form-item label="公司">
                  <el-input v-model="formLabelAlign.company" />
                </el-form-item>
                <el-form-item label="城市">
                  <el-input v-model="formLabelAlign.city" />
                </el-form-item>
              </el-form>
              <div
                class="w-[180px] h-[180px] ml-[200px]"
                :style="[btnImg === undefined ? '' : `background:url(${btnImg})`]"
                style="border-radius: 200px; background-size: 100%"
                @click="innerVisible = true"
              >
                <img src="" alt="" />
              </div>
            </el-tab-pane>
            <el-tab-pane label="安全设置">安全设置</el-tab-pane>
            <el-tab-pane label="账户绑定">账户绑定</el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <el-dialog v-model="innerVisible" width="800" title="Inner Dialog" append-to-body>
        <template #header>
          <span class="text-[18px] text-[#303133]">裁剪图片</span>
        </template>
        <imgs @change="test" :res-data="false"></imgs>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import imgs from '@/components/imgSet.vue';
import homeApi from '@/api/modules/home';
import projectApi from '@/api/modules/project';

// 声明变量和初始化
const activeTab = ref('基本设置');
const user = ref({ username: '', email: '' });
const labelPosition = ref<'right' | 'top' | 'left'>('right');
const formLabelAlign = reactive({
  name: '',
  region: '',
  email: '',
  phone: '',
  company: '',
  city: '',
});

// 生命周期函数
onMounted(async () => {
  try {
    const res = await homeApi.getUserInfo();
    user.value = res.data;
  } catch (error) {
    console.error(error);
  }
});
const btnImg = ref();
projectApi.getUser_info().then((res: any) => {
  btnImg.value = res.data.avatar;
});
const innerVisible = ref(false);
const test = (val: any) => {
  innerVisible.value = val.bol;
  btnImg.value = `http://192.168.122.36:1024/${val.val}`;
};
</script>

<style></style>
