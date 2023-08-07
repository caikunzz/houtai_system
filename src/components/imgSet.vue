<template>
  <div class="px-[40px] py-[40px] cut_out w-[100%]">
    <div class="flex items-center">
      <div class="h-[350px] w-[350px]">
        <!-- :fixedNumber="options.fixedNumber" -->
        <VueCropper
          ref="cropperRef"
          :img="imgUrl"
          :info="true"
          :infoTrue="options.infoTrue"
          :auto-crop="options.autoCrop"
          :auto-crop-width="options.autoCropWidth"
          :auto-crop-height="options.autoCropHeight"
          :fixed-box="options.fixedBox"
          :fixed="options.fixed"
          :canMoveBox="options.canMoveBox"
          :centerBox="options.centerBox"
          :full="options.full"
          :max-img-size="350"
          @realTime="realTime"
        >
        </VueCropper>
      </div>
      <div
        v-if="resData"
        class="overflow-hidden w-[290px] h-[160px] shadows ml-[40px]"
        style="
           {
            box-shadow: 0 0 4px #ccc;
            border-radius: 10px;
          }
        "
      >
        <img :src="imgUrl" alt="" :style="previews?.img" />
      </div>
      <div v-else class="overflow-hidden w-[200px] h-[200px] ml-[80px] rounded-[50%]">
        <img :src="imgUrl" alt="" :style="previews?.img" />
      </div>
    </div>
    <div class="flex justify-between w-[100%] h-[50px]">
      <div class="w-[350px] flex items-end">
        <el-upload
          action="#"
          :show-file-list="false"
          :auto-upload="false"
          :on-success="handleSuccess"
          :on-change="handleChange"
          :on-preview="handlPreview"
          :before-upload="handupload"
          list-type="picture"
        >
          <el-button type="primary" :icon="Upload">选择图片</el-button>
        </el-upload>
        <el-button class="ml-[12px]" type="primary" :icon="Plus" @click="changeScale(1)"></el-button>
        <el-button type="primary" :icon="Minus" @click="changeScale(-1)"></el-button>
        <el-button type="primary" :icon="RefreshLeft" @click="rotateClick('left')"></el-button>
        <el-button type="primary" :icon="RefreshRight" @click="rotateClick('right')"></el-button>
      </div>
      <div class="w-[370px] flex justify-center items-end">
        <el-button type="success" @click="uploadImg()">保存</el-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Plus, Minus, Upload, RefreshLeft, RefreshRight } from '@element-plus/icons-vue';

import type { UploadProps, UploadUserFile, UploadInstance, UploadFile } from 'element-plus';
import VueCropper from 'vue-cropper/src/vue-cropper.vue';
import projectApi from '@/api/modules/project';

const emits = defineEmits(['change']);
function test(val: any, bol: boolean) {
  emits('change', { val, bol });
}
const process = defineProps({
  resData: {
    type: Boolean,
    default: true,
  },
});

// 裁剪相关配置类型 interface
interface Options {
  img: string | ArrayBuffer | null; // 裁剪图片的地址
  info: true; // 裁剪框的大小信息
  outputSize: number; // 裁剪生成图片的质量 [1至0.1]
  outputType: 'jpeg'; // 裁剪生成图片的格式
  canScale: boolean; // 图片是否允许滚轮缩放
  autoCrop: boolean; // 是否默认生成截图框
  autoCropWidth: number; // 默认生成截图框宽度
  autoCropHeight: number; // 默认生成截图框高度
  fixedBox: boolean; // 固定截图框大小 不允许改变
  fixed: boolean; // 是否开启截图框宽高固定比例
  fixedNumber: Array<number>; // 截图框的宽高比例  需要配合centerBox一起使用才能生效
  full: boolean; // 是否输出原图比例的截图
  canMoveBox: boolean; // 截图框能否拖动
  original: boolean; // 上传图片按照原始比例渲染
  centerBox: boolean; // 截图框是否被限制在图片里面
  infoTrue: boolean; // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
}

// 裁剪相关配置
const options: Options = reactive({
  img: '', // 需要剪裁的图片
  autoCrop: true, // 是否默认生成截图框
  autoCropWidth: 350, // 默认生成截图框的宽度
  autoCropHeight: 160, // 默认生成截图框的长度
  fixedBox: true, // 是否固定截图框的大小 不允许改变
  info: true, // 裁剪框的大小信息
  outputSize: 1, // 裁剪生成图片的质量 [1至0.1]
  outputType: 'jpeg', // 裁剪生成图片的格式
  canScale: true, // 图片是否允许滚轮缩放
  fixed: false, // 是否开启截图框宽高固定比例
  fixedNumber: [1, 1], // 截图框的宽高比例 需要配合centerBox一起使用才能生效
  full: true, // 是否输出原图比例的截图
  canMoveBox: true, // 截图框能否拖动
  original: false, // 上传图片按照原始比例渲染
  centerBox: true, // 截图框是否被限制在图片里面
  infoTrue: false, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
});
// 裁剪之后的数据
const previews: any = ref({});
// 获取图片裁剪实例
const cropperRef: any = ref({});

const realTime = (data: any) => {
  previews.value = data;
  console.log(previews.value);
  console.log(cropperRef.value);
};
// 旋转图片
const rotateClick = (type: string) => {
  if (type == 'left') {
    cropperRef.value.rotateLeft();
  }
  if (type == 'right') {
    cropperRef.value.rotateRight();
  }
};

// 放大缩小图片比例
const changeScale = (num: number) => {
  const scale = num || 1;
  cropperRef.value.changeScale(scale);
  console.log(previews.value);
  console.log(cropperRef.value);
};

// 上传
// 上传图片
const fileList = ref<UploadUserFile[]>([]);
const imgUrl = ref<any>('');

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
  fileList.value = fileList.value.slice(-3);
  imgUrl.value = uploadFile.url;
  console.log(uploadFile, uploadFiles);
  // const imageUrl = URL.createObjectURL(uploadFile.name);
  // imgUrl.value = `blob:http://192.168.122.36:1024/${uploadFile.name}`;
};

const handlPreview = (uploadFile: UploadFile) => {
  console.log(uploadFile);
};
const isJPG = ref();
const isLt2M = ref();

const handupload = (file: any) => {
  isJPG.value = file.type === 'image/jpeg';

  isLt2M.value = file.size / 1024 / 1024 < 2;
};

// 提交
const base64toFile = (dataurl: any, filename = 'file') => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const suffix = mime.split('/')[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], `${filename}.${suffix}`, {
    type: mime,
  });
  return file;
};

const uploadImg = () => {
  cropperRef.value.getCropData((data: any) => {
    // 下面是将图标转为二进制
    const files = base64toFile(data);
    const formData = new FormData();
    formData.append('faceFile', files);
    // 添加上传接口及相关操作
    projectApi
      .getimg(formData)
      .then((res: any) => {
        test(res.data.path, false);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
const uploadRef = ref<UploadInstance>();
const submitUpload = () => {
  uploadRef.value!.submit();
};

const handleSuccess = (response: any) => {
  console.log(response.data.fullPath); // 获取上传图片的全路径
};
</script>
<style>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;
}
.shadows {
  border-radius: 10px;
  box-shadow: 0 0 4px #ccc;
}
</style>
