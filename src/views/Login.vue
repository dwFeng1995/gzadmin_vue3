<template>
    <div class="login-wrap">
      <div class="ms-login">
        <div class="ms-title">后台管理系统</div>
          <el-form :model="loginFormParams" :rules="loginFormRules" ref="loginFormRef" label-width="0px" class="ms-content">
            <el-form-item prop="username">
              <el-input @keyup.enter="submitForm()" v-model.trim="loginFormParams.username" placeholder="请输入用户名">
                <template #prepend>
                  <el-button icon="el-icon-user"></el-button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input type="password" placeholder="请输入密码" v-model.trim="loginFormParams.password" show-password
                      @keyup.enter="submitForm()">
                      <template #prepend>
                        <el-button icon="el-icon-lock"></el-button>
                      </template>
                </el-input>
              </el-form-item>
              <div class="login-btn">
                <el-button type="primary" @click="submitForm()">登录</el-button>
              </div>
          </el-form>
      </div>
    </div>
</template>

<script>
import {loginFormRules, loginFormParams, loginHandel, loginFormRef} from '@/hooks/admin'
import  {onBeforeUnmount} from 'vue'
export default {
    setup() {
        const submitForm =()=> loginHandel(loginFormParams)
        onBeforeUnmount(()=>{
          loginFormRef.value.resetFields()
        })
        return {
            loginFormParams,
            loginFormRules,
            loginFormRef,
            submitForm,
        }
    }
}
</script>

<style lang="scss" scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
</style>
