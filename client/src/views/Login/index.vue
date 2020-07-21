<template>
  <div>
    <el-input  placeholder="请输入账号" v-model="account" clearable></el-input>
    <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
    <el-button type="success" @click="addUser">提交</el-button>
  </div>
</template>
<script>
import { login, register, whoami} from '../../api/user'
export default {
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    submit () {
      login(this.account, this.password).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    addUser () {
      // const data = {
      //   account: this.account,
      //   password: this.password
      // }
      // register(data).then(res => {
      //   console.log(res)
      // }).catch(err => {
      //   console.log(err)
      // })
      whoami().then(res => {
        console.log(res)
      }).catch(e => {})
    }
  }
}
</script>