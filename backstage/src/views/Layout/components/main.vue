<template>
  <div class="main">
    <router-view />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .main {
    position: absolute;
    right: 0;
    top: 0;
    width: 81vw;
    height: 100vh;
    background-color: #f8fbff;
    box-shadow: 0px 2px 3px #0d80ff;
    border-radius: 30px;
    padding: 40px;
    box-sizing: border-box;
  }
</style>