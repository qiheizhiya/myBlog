<template>
  <div class="flex align-center justify-center flex-column pd">
    <div class="title flex align-center" :class="{white: !isDayTime}" >还没有账号？点击<Button text="注册" :styles="styles" @onclick="changeForm" /></div>
    <Border >
      <keep-alive>
        <components :is="formType" @handler="handler" />
      </keep-alive>
    </Border>
  </div>
</template>
<script>
import Border from '@c/Border'
import Login from '@c/LoginOrRegistory/Login'
import Registory from '@c/LoginOrRegistory/Registory.vue'
import Button from '@c/Button'
import { mapState } from 'vuex'
export default {
  components: {
    Login,
    Border,
    Button,
    Registory
  },
  computed: {
    ...mapState(['isDayTime'])
  },
  data () {
    return {
      styles: {
        'padding': '6px 30px',
        'font-size': '14px',
        'margin-left': '10px'
      },
      formType: 'Login'
    }
  },
  methods: {
    handler (e) {
      console.log(e)
    },
    changeForm () {
      this.formType === 'Login' ? this.formType = 'Registory' : this.formType = 'Login'
    }
  }
}
</script>

<style lang="less" scoped>
  .pd {
    height: 85vh;
  }
  .title {
    margin-bottom: 20px;
    font-size: 20px;
    &.white {
      color: #fff;
    }
  }
</style>