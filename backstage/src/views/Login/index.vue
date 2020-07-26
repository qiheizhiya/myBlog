<template>
  <div id="login">
    <div class="login-wrap">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
        size="medium"
      >
        <div class="title">欢迎来到后台管理系统</div>
        <el-form-item prop="account" class="item-form">
          <el-input v-model="ruleForm.account" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password" class="item-form">
          <el-input
            type="password"
            maxlength="20"
            minlength="6"
            v-model="ruleForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" class="login-btn block">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { login } from '@/api/user.js'
export default {
  data() {
    return {
      model: "",
      ruleForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        login(this.ruleForm.account, this.ruleForm.password).then(res => {
          this.$message.success('登陆成功')
          localStorage.setItem('token', res.data.data)
          this.$router.push("/work")
        })
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background: linear-gradient(to bottom right,#50a3a2,#53e3a6);
  overflow: hidden;
}
.login-wrap {
  width: 330px;
  margin: auto;
  margin-top: 200px;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    transition: all 0.5s;
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  padding: 40px 50px 24px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  -webkit-box-shadow: 0 2px 10px #e6e6e6;
  box-shadow: 0 2px 10px #e6e6e6;
  z-index: 9;
  label {
    display: block;
    font-size: 14px;
    color: #000;
    text-align: left;
  }
  .title {
    font-size: 22px;
    color: #0b9aff;
    letter-spacing: 2px;
    margin: 10px 0 24px;
  }
  .item-form {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 9px;
  }
}
</style>
<style >
.el-form-item--medium .el-form-item__content {
  margin-left: 0 !important;
}
</style>