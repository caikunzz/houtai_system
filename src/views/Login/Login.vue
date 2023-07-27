<template>
    <div class="w-[100%] h-[94vh] "
        style="background: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg); background-size: cover; margin: 0 auto;">
        <div class="w-[160px] h-[40px] flex items-center">
            <svg data-v-37dfd6fc="" viewBox="0 0 24 24" fill="none" style="font-size: 30px; height: 30px;">
                <path data-v-37dfd6fc="" fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 21a9 9 0 100-18 9 9 0 000 18zm0-4.737a4.263 4.263 0 100-8.526 4.263 4.263 0 000 8.526z"
                    fill="#165DFF"></path>
                <path data-v-37dfd6fc="" fill-rule="evenodd" clip-rule="evenodd"
                    d="M16.263 7.737H21v4.353l-.013.384h-4.75c.024-.237.026-.41.026-.41V7.737zM11.526 3.013c.207-.01.402-.013.402-.013h4.335v4.737h-4.35s-.202.004-.387.025v-4.75z"
                    fill="#165DFF"></path>
                <path data-v-37dfd6fc="" fill="#16D2AC" d="M15 3h6v6h-6z"></path>
            </svg>
            <p class="text-[20px] font-bold">Arco</p>
        </div>
        <div class="w-[350px]" style="margin:0 auto; overflow: hidden;" v-if="!show">
            <h1 class="text-[26px] pt-[85px]">登录 Arco</h1>
            <p class="text-[#ccc] pt-[6px] pb-[6px]">内部项目管理系统</p>
            <el-form ref="ruleFormRef" :model="ruleForm" :loginrules="loginrules" class="demo-ruleForm" :size="formSize"
                status-icon>
                <el-form-item prop="name" class="mt-[30px]">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名" :prefix-icon="User"
                        @blur="loginApi.postVerification({ username: ruleForm.name })"></el-input>
                </el-form-item>
                <el-form-item prop="name1">
                    <el-input v-model="ruleForm.name1" type="password" placeholder="请输入密码" :prefix-icon="Calendar"
                        @blur="loginApi.postpassword({})"></el-input>
                </el-form-item>
            </el-form>

            <div class="flex items-center justify-between">
                <el-checkbox v-model="checked2">记住密码</el-checkbox>
                <p class="text-[#409EFF]">忘记密码</p>
            </div>
            <div class="mt-[8px]">
                <el-button type="primary" size="large" class="w-[100%]">登录</el-button>
            </div>
            <div class="mt-[8px]">
                <el-button size="large" class="w-[100%]" @click="show = true">注册</el-button>
            </div>
        </div>

        <div class="w-[350px]" style="margin:50px auto; overflow: hidden;" v-if="show">
            <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm" :size="formSize" status-icon>
                <el-form-item prop="name" class="mt-[30px]">
                    <el-input v-model="ruleForm.name" placeholder="请输入用户名" :prefix-icon="User"></el-input>
                </el-form-item>
                <el-form-item prop="name1">
                    <el-input v-model="ruleForm.name1" type="password" placeholder="请输入邮箱"
                        :prefix-icon="ElemeFilled"></el-input>
                </el-form-item>

                <div class="w-[100%] flex justify-between">
                    <el-form-item class="w-[60%]">
                        <el-input placeholder="请输入验证码" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-button type="primary" plain>获取验证码</el-button>
                </div>
                <el-form-item prop="pass">
                    <el-input v-model="ruleForm.pass" type="password" placeholder="设置密码" :prefix-icon="Unlock"
                        autocomplete="off" />
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input v-model="ruleForm.checkPass" type="password" placeholder="确认密码" :prefix-icon="Lock"
                        autocomplete="off" />
                </el-form-item>

                <div class="w-[100%] flex justify-between">
                    <el-button type="primary" size="large" class="w-[35%]">注册</el-button>
                    <el-button size="large" class="w-[35%]" @click="show = false">去登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { Calendar, Search, User, Unlock, Lock, ElemeFilled } from '@element-plus/icons-vue'
import loginApi from "@/api/modules/login";
const input4 = ref('')
const checked2 = ref(false)
const show = ref(false)
interface RuleForm {
    name: string
    name1: string
    pass: string
    checkPass: string
}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    name: '',
    name1: '',
    pass: '',
    checkPass: '',
});

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        if (ruleForm.checkPass !== '') {
            if (!ruleFormRef.value) return
            ruleFormRef.value.validateField('checkPass', () => null)
        }
        callback()
    }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请重新输入密码'))
    } else if (value !== ruleForm.pass) {
        callback(new Error("两个输入不匹配！"))
    } else {
        callback()
    }
}

const panduan = (rule: any, value: any, callback: any) => {
    loginApi.postVerification({ username: value }).then((res) => {
        console.log(res);
        if (res.code == 404) {
            return callback(new Error('用户不存在'))
        } else if (res.code == 0) {
            return callback()
        }
    })
}

const loginrules = reactive<FormRules<RuleForm>>({
    name: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 5, message: '最少三位最多五位', trigger: 'blur' },
        { validator: panduan, trigger: 'blur' },
    ],
});
const rules = reactive<FormRules<RuleForm>>({
    name1: [
        {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
        },
        {
            pattern: /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+\.)+[A-Za-z]{2,}$/,
            message: '邮箱格式不正确',
            trigger: 'blur'
        }
    ],
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
});


</script>

<style></style>