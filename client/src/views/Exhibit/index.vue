<template>
  <div class="outer">
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
.outer {
  overflow: hidden;
}
.content-wrap {
  position: relative;
  padding: 100px 0;
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
@media screen and (max-width: 1200px) {
  .content-wrap {
    width: 900px; 
  }
}
@media screen and (max-width: 900px) {
  .content-wrap {
    width: 100%
  }
}
</style>