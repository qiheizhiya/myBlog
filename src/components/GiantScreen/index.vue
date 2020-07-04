<template>
  <div class="max">
    <div class="img-outer">
      <div class="move-outer flex align-center justify-center" :style="{transform: `translate3d(${imgX + 'px'}, ${imgY + 'px'}, 0)`}" >
        <img src="@/assets/img/jm.png"  >
      </div>
    </div>
    <div class="header flex align-center space-between">
      <img src="@/assets/img/logo1.png" alt="">
      <div class="icon"><i class="el-icon-s-unfold"></i></div>
    </div>
    <div class="mask"></div>
    <div class="info">
      <div class="time">七月4号</div>
      <div class="title">你好，我叫隆杰！</div>
      <div class="content">眼里有光，心中有爱，一路春暖花开，看淡得失，珍惜拥有，不负时光，不负自己，所有美好，都将如期而至</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgDom: '',
      imgX: 0,
      imgY: 0
    }
  },
  created () {
  },
  methods: {
    
  }
}
</script>
<style lang="less" scoped>
  .max {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    perspective: 800px;
    transform-style: preserve-3d;
    position: relative;
    .img-outer {
      width: 100%;
      height: 100%;
    }
    .move-outer {
      width: 100%;
      height: 100%;
      transform: translate3d(0px,0px,0px);
      img {
        height: 100%;
      }
    }
  }
  .header {
    padding: 0 40px;
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;
    height: auto;
    z-index: 9;
    img {
      width: 100px;
      height: 44px;
      cursor: pointer;
    }
    .icon {
      font-size: 20px;
      color: #ff3600;
      background: rgba(255, 255, 255, .8);
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(176, 14, 37, 0.7);
    clip-path: polygon(0 0,25% 0,60% 100%,0 100%);
  }
  .info {
    position: absolute;
    top: 54%;
    left: 10%;
    color: #fff;
    width: 30%;
    transform: translateY(-50%);
    color: #ffffff;
    font-size: .5rem;
    .title {
      font-size: 1rem;
      margin: 15px 0 30px;
    }
  }
</style>