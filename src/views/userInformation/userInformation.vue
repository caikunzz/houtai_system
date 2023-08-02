<template>
  <div class="w-full h-full mx-auto">
    <div class="flex justify-center">
      <div class="w-[70%] h-[100%] mt-[30px] bg-[#fff]" style="border-radius: 10px">
        <el-tabs tab-position="left" class="mt-4">
          <el-tab-pane v-model="activeTab" label="基本设置">
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="formLabelAlign"
              style="max-width: 460px"
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
          </el-tab-pane>
          <el-tab-pane label="安全设置">安全设置</el-tab-pane>
          <el-tab-pane label="账户绑定">账户绑定</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import homeApi from '@/api/modules/home';

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
</script>

<style></style>
