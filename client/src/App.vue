<template>
  <div id="app">
    <transition class="change" name="fade" mode="out-in" >
      <keep-alive>
        <router-view :key="routerId" />
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
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
