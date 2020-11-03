<template>
  <div id="app">
    <BackTop />
    <pageLoadScrollBar />
    <transition class="change" name="fade" mode="out-in" >
      <keep-alive :exclude="['detail']">
        <router-view :key="routerId" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import pageLoadScrollBar from "@c/pageLoadScrollBar"
import BackTop from "@c/BackTop"
export default {
  components: { pageLoadScrollBar, BackTop },
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
  -webkit-tap-highlight-color: transparent;
}
.fade-leave-active {
  transition: all .6s ease-out;
  opacity: 0;
  transform: translateX(-20px);
}
.fade-enter-active {
  transition: all .5s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: translateX(20px);
}
</style>
