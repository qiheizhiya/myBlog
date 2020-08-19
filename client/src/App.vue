<template>
  <div id="app">
    <pageLoadScrollBar />
    <transition class="change" name="fade" mode="out-in" >
      <keep-alive :exclude="['detail']">
        <router-view :key="routerId" />
      </keep-alive>
    </transition>
    <el-backtop /> 
  </div>
</template>
<script>
import pageLoadScrollBar from "@c/pageLoadScrollBar"
export default {
  components: { pageLoadScrollBar },
  computed: {
    routerId () {
      return this.$route.name
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: eafont,Hiragino Sans GB,Hiragino Sans GB W3,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  scroll-behavior: smooth;
}
.fade-leave-active {
  transition: all .6s ease-out;
  opacity: 0;
  transform: translateX(-40px);
}
.fade-enter-active {
  transition: all .5s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: translateX(40px);
}

</style>
