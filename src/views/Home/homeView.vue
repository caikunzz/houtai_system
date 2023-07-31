<template>
  <div class="bg-[#F1F1F1] h-[500px] min-w-1110px">
    <div class="w-[100%] h-[153px] bg-[#fff] flex">
      <!-- 头像部分 -->
      <div class="w-[90px] h-[90px] rounded-full bg-[pink] overflow-hidden mt-[32px] ml-[20px]">
        <img :src="user.avatar" alt="" />
      </div>
      <!-- 信息部分 -->
      <div class="w-[614px] h-[100%] bg-[pink] ml-[20px]">
        <p class="text-[25px] pt-6 pl-6">{{ greeting }}, {{ user.username }}，祝你开心每一天！</p>
        <p v-if="user.roles[0]">{{ user.roles[0].name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import homeApi from '@/api/modules/home.ts';

const user = ref({
  avatar: '',
  username: '',
  roles: [
    {
      name: '',
    },
  ],
});
homeApi
  .getVerification()
  .then(async (verificationResponse) => {
    console.log(verificationResponse.data);
    const res = await homeApi.getUserInfo();
    console.log(res);
    user.value = res.data;
    console.log(user.value);
  })
  .catch((error) => {
    console.error(error);
  });
const greeting = ref('');
const currentHour = new Date().getHours();
if (currentHour >= 0 && currentHour < 12) {
  greeting.value = '上午好';
} else if (currentHour >= 12 && currentHour < 18) {
  greeting.value = '下午好';
} else {
  greeting.value = '晚上好';
}
</script>

<style lang="scss" scoped></style>
