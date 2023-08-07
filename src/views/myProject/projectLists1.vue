<template>
  <ul :class="listData.data[currentPage - 1] === listData.data[listData.data.length - 1] ? 'h-[75vh]' : ''">
    <li
      v-for="(item, index) in listData.data[currentPage - 1]"
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
        <div class="w-[160px] flex">
          <el-tooltip class="box-item" effect="dark" content="项目成员" placement="top-start">
            <el-button :icon="User" @click="getUserlist(item.id)" circle> </el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="项目设置" placement="top-start">
            <el-button
              :icon="Setting"
              circle
              @click="
                setupPropt(
                  item.cover,
                  item.name,
                  item.progress,
                  item.intro,
                  item.is_private,
                  item.is_recycle,
                  item.creator.username,
                  item.creator.avatar,
                  item.is_auto_progress,
                  item.member,
                  item.creator.id,
                  item,
                )
              "
            >
            </el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="加入收藏" placement="top-start">
            <el-button circle @click="star(item.id)">
              <el-icon v-if="item.collector[0] !== undefined"
                ><StarFilled class="text-[#ff6800] text-[14px]"
              /></el-icon>
              <el-icon v-else><Star /></el-icon>
            </el-button>
          </el-tooltip>
          <el-tooltip class="box-item" effect="dark" content="移至回收站" placement="top-start">
            <el-button :icon="Delete" circle @click="recycle(item)"> </el-button>
          </el-tooltip>
        </div>
      </div>
    </li>
  </ul>
  <el-dialog v-model="dialogVisible" title="项目成员" width="530">
    <el-input v-model="input" placeholder="请输入用户名或邮箱查找" @input="userInput" />
    <div class="pt-[12px] h-[310px] overflow-auto">
      <div
        v-for="(item, index) in user"
        class="py-[12px] h-[70px] border-t-[1px] border-solid border-[#dcdfe6] flex justify-between"
        :key="index"
      >
        <div class="flex">
          <img :src="item.avatar" alt="" class="w-[32px] h-[32px] rounded-[50%] mr-[15px]" />
          <div class="self-center">
            <p>{{ item.username }}</p>
            <p>{{ item.email }}</p>
          </div>
        </div>
        <div class="text-[14px] text-[#00000073] self-center">
          <template v-if="index === 0">
            <el-icon><Avatar /></el-icon><span class="font-medium">拥有者</span>
          </template>
          <template v-else>
            <el-icon><User /></el-icon><span class="font-light">已加入</span>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
  <SetProject :id="setData" :show="set" @change="bols" />
  <el-pagination
    v-model:current-page="currentPage"
    background
    layout="prev, pager, next"
    :total="data.data.count"
    class="justify-center mt-[15px]"
  />
</template>
<script setup lang="ts">
import { Picture, User, Setting, Star, Delete, StarFilled } from '@element-plus/icons-vue';
import router from '@/router';
import SetProject from '@/views/myProject/components/setupProject.vue';
import projectApi from '@/api/modules/project';

const dialogVisible = ref(false);
const currentPage = ref(1);
const input = ref('');
const ids = ref();
const set = ref(false);
const setData = ref();
// 项目设置
const setupPropt = (
  img: string,
  name: string,
  progress: number,
  Introduction: string,
  _private: number,
  _recycle: number,
  username: string,
  userImg: string,
  autoprogress: number,
  member: object[],
  _ids: any,
  obj: any,
) => {
  const data = {
    img1: img,
    name1: name,
    progress1: progress,
    Introduction1: Introduction,
    private1: _private,
    recycle1: _recycle,
    username1: username,
    userImg1: userImg,
    autoprogress1: autoprogress,
    member1: member,
    id: _ids,
    myobj: obj,
  };
  setData.value = data;
  set.value = true;
};

const bols = (val: boolean) => {
  console.log(val);
  set.value = val;
};
const groupArray = (arr: any[], groupSize: number) => {
  const a = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].collector.length !== 0) {
      a.push(arr[i]);
      arr.splice(i, 1);
    }
  }
  a.reverse().forEach((element: any) => {
    arr.unshift(element);
  });
  console.log(arr);

  const result = Array.from({ length: Math.ceil(arr.length / groupSize) }, (_, index) =>
    arr.slice(index * groupSize, index * groupSize + groupSize),
  );
  return <[]>result;
};

const data = ref({
  code: Number,
  data: {
    count: Number || 0,
    rows: Array,
  },
  msg: String,
});
const listData: {
  data: Array<any>;
} = {
  data: [], // 初始化为空数组
};
// 请求
const getlist = () => {
  projectApi
    .getProjectsList({
      collection: 0,
      is_recycle: 0,
    })
    .then((res: any) => {
      data.value.data = res.data;
      data.value.code = res.code;
      data.value.msg = res.msg;
      listData.data = groupArray(res.data.rows.reverse(), 11);
      console.log(listData.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
getlist();
const star = (id: any) => {
  projectApi.getUser_info().then((ress: any) => {
    projectApi.postChange({ user_id: ress.data.id, project_id: id }).then((res) => {
      ElMessage({
        message: '修改成功',
        type: 'success',
      });
      getlist();
      return res;
    });
  });
};
const user = ref();
const getUserlist = (id: number) => {
  ids.value = id;
  projectApi
    .getUserslist({ keyword: '', limit: 6, offset: 0, project_id: id })
    .then((res: any) => {
      console.log(res);
      user.value = res.data.rows;
    })
    .catch((err) => {
      return err;
    });
  dialogVisible.value = true;
};
const userInput = (val: string | number) => {
  projectApi
    .getUserslist({ keyword: val, limit: 6, offset: 0, project_id: ids.value })
    .then((res: any) => {
      console.log(res);
      user.value = res.data.rows;
    })
    .catch((err) => {
      return err;
    });
};

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
      newobjs.is_recycle = 1;
      projectApi
        .putProjects(newobjs)
        .then((ress: any) => {
          getlist();
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
<style>
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
