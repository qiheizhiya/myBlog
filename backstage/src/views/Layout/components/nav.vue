<template>
  <div class="nav flex flex-column align-center" >
    <div class="info flex flex-column align-center">
      <div class="imgouter flex align-center justify-center">
        <img :src="userInfo.avatar" alt="">
      </div>
      <span>{{userInfo.userName}}</span>
    </div>
    <div class="navitem">
      <el-menu :default-active="defaultPath" active-text-color="#0d80ff" :router="true" class="el-menu-vertical-demo">
        <template v-for="(router) in routes" >
          <el-menu-item :index="router.path" :key="router.path" v-if="!router.hidden" class="flex align-center thunk">
            <i class="el-icon-menu" :class="router.meta.icon"></i>
            <span slot="title">{{router.meta.name}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import { whoami } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      routes: [],
      defaultPath: ''
    }
  },
  computed: mapState(['userInfo']),
  created () {
    this.routes = this.$router.options.routes
    this.defaultPath = this.$route.matched[0].path
    this.getUserInfo()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    async getUserInfo () {
      try {
        const result = await whoami()
        this.setUserInfo(result.data.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .nav {
    background-color: #5e768f ;
    width: 20vw;
    height: 100vh;
    color: #ffffff;
    overflow: hidden;
    border-radius: 30px;
    box-shadow: 0px 10px 20px #0d80ff;
    .info {
      margin-top: 100px;
      .imgouter {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        background: rgba(255, 255, 255, .1);
        img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
        }
      }
      span {
        margin-top: 16px;
      }
    }
    .navitem {
      width: 100%;
      margin-top: 60px;
      .thunk {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        border-radius: 23px 0 0 23px;
        color: #ffffff;
        &:hover {
          color: #0d80ff;
          i {
            color: #0d80ff;
          }
        }
        i {
          color: #ffffff;
          transition: all .3s;
        }
        &.is-active {
          background-color: #ffffff;
          color: #0d80ff;
          i {
            color: #0d80ff;
          }
        }
      }
    }
  }
  /deep/ .el-menu {
    border-radius: 23px 0 0 23px;
    color: #0d80ff;
    padding-left: 30px;
    background-color: rgba(0,0,0,0) !important;
  }
</style>