<template>
  <div id="app">
    <transition class="change" name="fade" mode="out-in" >
      <router-view :key="routerId" />
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
}
.fade-leave-active {
  transition: all .7s ease-in;
}
.fade-enter-active {
  transition: all 1s linear;
}
.fade-leave-to {
  transform: translateX(-80px);
  opacity: 0;
}
.fade-enter {
  opacity: 0;
}

</style>
