<template>
  <div id="app">
    <transition-group tag="div"  name="el-fade-in-linear" mode="in-out" >
      <div class="bg dayTime" :class="{night: !isDayTime}" key="dayTime"></div>
      <Light key="light" @changeBackground="changeBackground" /> 
      <Header key="header" v-if="$route.name !== 'Home'" />
      <router-view :key="routerId" />
      <Footer key="footer" v-if="$route.name !== 'Home'"  />
    </transition-group>
  </div>
</template>
<script>
import Header from '@c/Header'
import Footer from '@c/Footer'
import Light from '@c/Header/light.vue'
export default {
  components: {
    Header,
    Footer,
    Light
  },
  data () {
    return {
      isDayTime: this.$store.state.isDayTime
    }
  },
  computed: {
    routerId () {
      return this.$route.path
    }
  },
  mounted () {
    console.log(this.isDayTime)
  },
  methods: {
    changeBackground (e) {
      this.$store.commit("SetIsDayTime",e)
      this.isDayTime = e
    }
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
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.dayTime {
  background: url('./assets/img/white.png') !important;
}
.night {
   background: url('./assets/img/night.gif') !important;
}
</style>
