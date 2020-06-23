<template>
  <div class="header flex align-center justify-center">
    <div class="content-wrap flex align-center space-between">
      <router-link :to="{name: 'Home'}" tag="h1" class="logo">
        <Logo />
      </router-link>
      <nav>
        <Navs />
      </nav>
    </div>

  </div>
</template>
<script>
import Logo from "./logo"
import Navs from "./navs"
export default {
  components: {
    Logo,
    Navs
  }
}
</script>
<style lang="less" scoped>
  .header {
    width: 100%;
    height: 5vh;
    background: linear-gradient(#333,#456);
    animation: change .6s ;
  }
  @keyframes change {
    0% {
      height: 3vh;
    }
    100% {
      height: 5vh;
    }
  }
</style>