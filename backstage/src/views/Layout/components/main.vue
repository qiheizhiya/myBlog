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
    box-shadow: 0px 12px -2px 2px #0d80ff;
    border-radius: 30px;
    padding: 70px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
      height: 8px;
      background-color: #fff;
    }
    &::-webkit-scrollbar-thumb {
      background: #0d82ff8e; 
  }
  }
</style>