<template>
  <div class="max flex align-center justify-center">
    <div class="icon flex align-center" @click="toIndex">
      <img src="@img/whitelogo.png" alt="">
    </div>
    <LoginBg />
    <div class="form">
      <LoginRegistration padding="100px 40px" @click="submit" :captchaErr="captchaErr" :updateType="updateType" />
    </div>
  </div>
</template>
<script>
import { login, addUser, whoami, registry } from '../../api/user'
import LoginBg from '@c/loginRegistration/loginBg'
import LoginRegistration from '@c/loginRegistration'
export default {
  components: { LoginBg, LoginRegistration },
  data () {
   return {
      captchaErr: 0,
      updateType: 0
    } 
  },
  methods: {

    toIndex () {
      this.$router.replace("/")
    },

    submit ({type, data}) {
      type === 0 ? this.landing(data) : this.enroll(data)
    },

    // 登陆
    landing ({account, password}) {
      login(account, password).then( async res => {
        localStorage.setItem('token', res.data.data)
        this.$store.commit("setIsToken", true)
        this.$message.success('登陆成功, 1秒后即将返回首页')
        const result = await whoami()
        localStorage.setItem('userInfo', JSON.stringify(result.data.data))
        setTimeout(() => {
          this.$router.push({ path: '/' })
        }, 1000)
      }).catch(err => {
      })
    },
    // 注册
    enroll (data) {
      registry(data).then(res => {
        this.$message.success('注册成功')
        this.updateType += 1
      }).catch(err => {
        if (err.code === 401) {
          this.captchaErr += 1
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .max {
    width: 100vw;
    height: 100vh;
    .icon {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 60px;
      img {
        width: 100px;
        height: auto;
        cursor: pointer;
      }
    }
  }
  .form {
    width: 600px;
  }

  @media screen and (max-width: 700px){
    .form {
      width: 90%;
    }
  }
</style>