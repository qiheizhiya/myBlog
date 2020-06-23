<template>
  <div id="app">
    <transition-group  name="el-fade-in-linear" mode="in-out" >
      <Header key="header" v-if="$route.name !== 'Home'" />
      <router-view :key="routerId" />
    </transition-group>
  </div>
</template>
<script>
import Header from '@c/Header'
export default {
  components: {
    Header
  },
  computed: {
    routerId () {
      return this.$route.path
    }
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>
<style lang="less">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

</style>
