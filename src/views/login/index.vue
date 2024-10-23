<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="switch-dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login-left.svg" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.png" alt="logo" />
          <h2 class="logo-text">YM-Admin</h2>
        </div>
        <LoginForm ref="loginRef"></LoginForm>
        <div class="login-btns">
          <el-button class="login-btn" size="large" @click="handleResetClick"> 重置 </el-button>
          <el-button type="primary" size="large" class="login-btn" @click="handleSubmitClick">
            立即登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SwitchDark from '@/components/SwitchDark/index.vue'
import LoginForm from './components/LoginForm.vue'
const loginRef = ref<InstanceType<typeof LoginForm>>()

const handleSubmitClick = () => {
  loginRef.value?.loginAction()
}

const handleResetClick = () => {
  loginRef.value?.resetAction()
}
</script>

<style scoped lang="scss">
@import './index';
</style>
