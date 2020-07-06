<template>
  <div>
    <transition-group  name="list"  tag="div" id="app">
      <router-view :key="routerId" />
    </transition-group>
  <Footer key="footer"/>
  </div>
</template>
<script>
import Footer from '@c/Footer'
export default {
  components: { Footer },
  computed: {
    routerId () {
      return this.$route.name
    },
    MathRamdom () {
      return this.$route.path
    }
  }
}
</script>
<style lang="less">
#app {
  font-family: eafont,Hiragino Sans GB,Hiragino Sans GB W3,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}
.list-enter-active, .list-leave-active {
  transition: all 1.5s ease-in;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
</style>
