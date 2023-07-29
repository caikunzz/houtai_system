<template>
  <!-- <LazyLoading v-if="loading" /> -->
  <div
    class="bg-light-100 relative w-screen h-[100vh] flex items-center justify-center"
    style="
      background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg) no-repeat;
      background-size: 100%;
      background-position: center 110px;
    "
  >
    <div class="absolute top-[24px] left-[24px] flex items-center">
      <svg data-v-37dfd6fc="" viewBox="0 0 24 24" fill="none" style="font-size: 30px; height: 30px">
        <path
          data-v-37dfd6fc=""
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.737a4.263 4.263 0 100-8.526 4.263 4.263 0 000 8.526z"
          fill="#165DFF"
        ></path>
        <path
          data-v-37dfd6fc=""
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.263 7.737H21v4.353l-.013.384h-4.75c.024-.237.026-.41.026-.41V7.737zM11.526 3.013c.207-.01.402-.013.402-.013h4.335v4.737h-4.35s-.202.004-.387.025v-4.75z"
          fill="#165DFF"
        ></path>
        <path data-v-37dfd6fc="" fill="#16D2AC" d="M15 3h6v6h-6z"></path>
      </svg>
      <span class="font-575 text-[1.25rem]">Arco</span>
    </div>
    <div class="flex flex-col w-[320px] h-[390px] justify-center">
      <!-- 登录 -->
      <el-space v-if="show" direction="vertical" :fill="true" class="w-[100%]">
        <div class="mb-[40px]">
          <h1 class="text-[24px] text-[#1d2129] mb-[5px]">登录 Arco</h1>
          <p class="text-[16px] text-[#86909c]">内部项目管理系统</p>
        </div>
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              type="text"
              autocomplete="off"
              :prefix-icon="User"
              class="h-[40px]"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
              show-password
              :prefix-icon="Lock"
              class="h-[40px]"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item prop="checked1">
            <div class="flex w-[100%] justify-between items-center">
              <el-checkbox v-model="checked" label="记住密码" size="large" />
              <span class="text-[#409eff]" @click="(show = !show), (show2 = false)">忘记密码</span>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" class="w-[100%] h-[40px]" @click="onSubmit">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button class="w-[100%]" size="large" plain @click="show = !show">注册</el-button>
          </el-form-item>
        </el-form>
      </el-space>
      <!-- 注册 -->
      <el-space v-else-if="!show" direction="vertical" :fill="true">
        <el-form ref="ruleFormRef2" :model="ruleForm2" :rules="rules2" label-width="auto" class="demo-ruleForm">
          <el-form-item v-if="show2" prop="name">
            <el-input
              v-model="ruleForm2.name"
              :prefix-icon="User"
              type="text"
              autocomplete="off"
              class="h-[40px]"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="mail">
            <el-input
              v-model="ruleForm2.mail"
              :prefix-icon="Message"
              type="text"
              autocomplete="off"
              class="h-[40px]"
              placeholder="请输入邮箱"
            />
          </el-form-item>
          <div class="flex justify-between">
            <el-form-item prop="verificationCode">
              <el-input
                v-model="ruleForm2.verificationCode"
                type="text"
                autocomplete="off"
                class="w-[50%] h-[40px] box-border"
                placeholder="验证码"
              />
            </el-form-item>
            <el-button
              v-if="show2"
              type="primary"
              :disabled="disabled"
              plain
              size="large"
              class="w-[110px] h-[40px]"
              @click="onEmali"
              >{{ yzm }}</el-button
            >
            <el-button
              v-else
              type="primary"
              :disabled="disabled"
              size="large"
              class="w-[110px] h-[40px]"
              @click="onEmali"
              >{{ yzm }}</el-button
            >
          </div>
          <el-form-item prop="pass">
            <el-input
              v-model="ruleForm2.pass"
              show-password
              :prefix-icon="Unlock"
              type="pass"
              autocomplete="off"
              class="h-[40px]"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              v-model="ruleForm2.checkPass"
              show-password
              :prefix-icon="Lock"
              type="pass"
              autocomplete="off"
              class="h-[40px]"
              placeholder="请再次输入密码"
            />
          </el-form-item>
          <div class="flex justify-between">
            <el-button v-if="show2" type="primary" size="large" class="w-[48%] h-[40px]" @click="onLogin"
              >注册</el-button
            >
            <el-button v-else type="primary" size="large" class="w-[48%] h-[40px]" @click="setPass">重置密码</el-button>
            <el-button plain size="large" class="w-[48%] h-[40px]" @click="(show = !show), (show2 = true)"
              >去登录</el-button
            >
          </div>
        </el-form>
      </el-space>
    </div>
    <div class="absolute bottom-0 w-screen py-3 flex justify-center items-center">
      <span class="text-[16px] text-[#999]">© 2021 HOPU | 鄂ICP备29218126号-1 </span>
    </div>
  </div>
  <Vcode
    :show="isShow"
    @success="onSuccess"
    @close="onClose"
    :slider-size="40"
    :canvasWidth="400"
    :canvasHeight="200"
  />
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import { User, Message, Lock, Unlock } from '@element-plus/icons-vue';
import Vcode from 'vue3-puzzle-vcode';
import store from 'store';
import loginApi from '@/api/modules/login';

console.log(store.get('user_token'));
const isShow = ref(false);
const onShow = () => {
  isShow.value = true;
};

const onClose = () => {
  isShow.value = false;
};

const checked = ref(false);
const show = ref(true); // 注册
const show2 = ref(true); // 忘记密码
const code = ref(false); // 判断用户名是否存在/重名
const yzm = ref('发送验证码');
const email = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; // 邮箱正则
const pass = /[a-zA-Z0-9]\w{6,12}$/g;
// 登录验证
// 登录信息
const ruleForm = reactive({
  name: '',
  pass: '',
});
// 登录用户名部分
const ruleFormRef = ref<FormInstance>();
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    if (ruleForm.name !== '') {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField('checkPass', () => null);
    }
    loginApi
      .getVerification({ username: value })
      .then((res: object) => {
        if ((res as { code: number }).code === 0) {
          console.log('用户已存在');
          code.value = true;
          callback();
        } else if ((res as { code: number }).code === 404) {
          callback(new Error('用户名不存在'));
          code.value = false;
        }
      })
      .catch((err: object) => {
        console.log(err);
      });
  }
};
// 登录密码部分
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else {
    callback();
  }
};
// 反馈通知
// {title:string,message:string,position:string}
// 成功时的信息
const open = (tle: string, msg: string) => {
  ElNotification({
    title: tle,
    dangerouslyUseHTMLString: true,
    message: `<div class="flex justify-between items-center text-[16px] font-bold py-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48"><path fill="#67c23a" fill-rule="evenodd" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Zm10.742-26.33a1 1 0 1 0-1.483-1.34L21.28 29.567l-6.59-6.291a1 1 0 0 0-1.382 1.446l7.334 7l.743.71l.689-.762l12.667-14Z" clip-rule="evenodd"/></svg>
        <p>${msg}<p>
      <div>`,
    position: 'bottom-left',
  });
};
// 错误时的信息
const open2 = (tle: string, msg: string) => {
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
// 登录按钮
// onShow();
const onSuccess = () => {
  onClose();
  const data = {
    username: ruleForm.name,
    password: ruleForm.pass,
  };
  if (data.password !== '' && data.username !== '' && code.value === true) {
    console.log('登录：用户已存在');
    loginApi
      .postVerification(data)
      .then((res: object) => {
        console.log(res);
        open('成功', `登录成功`);
        loginApi.getVerificationInfo().then((ress: object) => {
          console.log(ress);
        });
      })
      .catch((err: object) => {
        console.log(err);
        open2('错误', `密码错误!`);
      });
  } // 验证成功，需要手动关闭模态框
};
const onSubmit = () => {
  const data = {
    username: ruleForm.name,
    password: ruleForm.pass,
  };
  if (data.password !== '' && data.username !== '' && code.value === true) {
    onShow();
  }
};
const rules = reactive<FormRules<typeof ruleForm>>({
  name: [{ validator: validateName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
});

// 注册验证
const ruleFormRef2 = ref<FormInstance>();
const ruleForm2 = reactive({
  mail: '',
  verificationCode: '',
  pass: '',
  checkPass: '',
  name: '',
});
// 注册用户名验证
const flagName = ref(false);
const validateNames = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入用户名'));
  } else {
    loginApi
      .getVerification({ username: value })
      .then((res: object) => {
        console.log(res);
        if ((res as { code: number }).code === 0) {
          callback(new Error('用户名重复'));
          flagName.value = false;
          callback();
        } else if ((res as { code: number }).code === 404) {
          console.log('用户名可用');
          flagName.value = true;
        }
      })
      .catch((err: object) => {
        console.log(err);
      });
  }
};
// 邮箱验证
const flagEmail = ref(false);
const validateMail = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入邮箱地址'));
  } else {
    console.log(show2.value === false);
    if (email.test(value)) {
      loginApi
        .getVerification({ email: value })
        .then((res: object) => {
          console.log(res);
          if ((res as { code: number }).code === 0) {
            if (show2.value === true) {
              callback(new Error('此邮箱已被注册'));
              flagEmail.value = false;
            } else {
              callback();
              flagEmail.value = true;
            }
          } else if ((res as { code: number }).code === 404) {
            if (show2.value === false) {
              callback(new Error('请输入正确的邮箱地址'));
              flagEmail.value = false;
            } else {
              callback();
              flagEmail.value = true;
            }
          }
        })
        .catch((err: object) => {
          console.log(err);
        });
    } else {
      callback(new Error('请输入正确的邮箱地址'));
    }
  }
};
const validateCode = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入验证码'));
  } else {
    callback();
  }
};
// 发送验证码
const disabled = ref(false);
const onEmali = () => {
  if (ruleForm2.mail !== '') {
    loginApi
      .getVerification({ email: ruleForm2.mail })
      .then((res: object) => {
        console.log(res);
        if ((res as { code: number }).code === 0) {
          if (show2.value === false) {
            loginApi
              .postVerificationCodes({
                target: ruleForm2.mail,
                type: 1,
              })
              .then((ress) => {
                console.log(ress);
                open('', `验证码已发送至${ruleForm2.mail},请查收！`);
              })
              .catch((err: object) => {
                console.log(err);
              });
            disabled.value = true;
            let i = 25;
            yzm.value = `重新发送${i}`;
            const t = setInterval(() => {
              if (i === 0) {
                disabled.value = false;
                yzm.value = '获取验证码';
                clearInterval(t);
              } else {
                i -= 1;
                yzm.value = `重新发送${i}`;
              }
            }, 1000);
          }
        } else if ((res as { code: number }).code === 404) {
          loginApi
            .postVerificationCodes({
              target: ruleForm2.mail,
              type: 1,
            })
            .then((ress) => {
              console.log(ress);
              open('', `验证码已发送至${ruleForm2.mail},请查收！`);
            })
            .catch((err: object) => {
              console.log(err);
            });
          disabled.value = true;
          let i = 25;
          yzm.value = `重新发送${i}`;
          const t = setInterval(() => {
            if (i === 0) {
              disabled.value = false;
              yzm.value = '获取验证码';
              clearInterval(t);
            } else {
              i -= 1;
              yzm.value = `重新发送${i}`;
            }
          }, 1000);
        }
        return false;
      })
      .catch((err: object) => {
        console.log(err);
      });
  }
};
// 密码
const flagPass = ref(false);
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (ruleForm2.pass !== '' && pass.test(ruleForm2.pass)) {
    callback();
    flagPass.value = true;
  } else if (pass.test(ruleForm2.pass) === false) {
    callback(new Error('密码是6-12位字母和数字'));
    flagPass.value = false;
  }
};
// 验证两次密码是否一致
const flagPass2 = ref(false);
const validateCheckPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (value !== ruleForm2.pass) {
    callback(new Error('两次输入密码不一致'));
    flagPass2.value = false;
  } else {
    callback();
    flagPass2.value = true;
  }
};

// 注册
const onLogin = () => {
  const data = {
    username: ruleForm2.name,
    email: ruleForm2.mail,
    code: ruleForm2.verificationCode,
    password: ruleForm2.pass,
    passwordConfirm: ruleForm2.checkPass,
    verification_type: 1,
    avatar: 'https://fastly.picsum.photos/id/786/100/100.jpg?hmac=U1abk7VHh3Xe1NJZtRkB0hEL0TEHGWQKnuE5iO_kNHY',
  };
  if (
    flagEmail.value === true &&
    flagName.value === true &&
    flagPass.value === true &&
    flagPass2.value === true &&
    data.code !== ''
  ) {
    console.log(data);
    loginApi
      .postLogin(data)
      .then((res: object) => {
        console.log(res);
        if ((res as { code: number }).code === 0) {
          console.log(res);
          open('', `注册成功`);
        } else if ((res as { code: number }).code === 404) {
          console.log(res);
        }
      })
      .catch((err: object) => {
        console.log(err);
      });
  }
};

// 重置密码
const setPass = () => {
  const data = {
    code: ruleForm2.verificationCode,
    email: ruleForm2.mail,
    password: ruleForm2.pass,
    passwordConfirm: ruleForm2.checkPass,
  };
  if (flagEmail.value === true && flagPass.value === true && flagPass2.value === true && data.code !== '') {
    loginApi
      .putVerificationSetpassword(data)
      .then((res: object) => {
        console.log(res);
        if ((res as { code: number }).code === 0) {
          open('', `密码重置成功`);
        } else if ((res as { code: number }).code === 404) {
          open('', `密码重置失败！`);
        }
      })
      .catch((err: object) => {
        console.log(err);
      });
  }
};

const rules2 = reactive<FormRules<typeof ruleForm2>>({
  mail: [{ validator: validateMail, trigger: 'blur' }],
  verificationCode: [{ validator: validateCode, trigger: 'blur' }],
  checkPass: [{ validator: validateCheckPass, trigger: 'blur' }],
  pass: [{ validator: validatePass2, trigger: 'blur' }],
  name: [{ validator: validateNames, trigger: 'blur' }],
});
</script>
