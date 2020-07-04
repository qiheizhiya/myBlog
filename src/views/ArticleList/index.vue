<template>
  <div>
    <GiantScreen />
    <div class="content-wrap">
      <Article />
    </div>
  </div>
</template>
<script>
import GiantScreen from '@c/GiantScreen/index'
import Article from '@c/Article/index'
export default {
  components: { GiantScreen, Article },
  data () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
  .content-wrap {
    position: relative;
    padding-top: 100px;
    &::after {
      content: '';
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      position: absolute;
      background: #eaeaea;
      z-index: 0;
      width: 1px;
      height: 100%;
    }
  }
</style>