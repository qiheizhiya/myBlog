<template>
  <div class="max">
    <div class="img-outer">
      <div class="move-outer flex align-center justify-center" :style="{transform: `translate3d(${imgX + 'px'}, ${imgY + 'px'}, 0)` }" >
        <img src="@/assets/img/jm.png" :width="imgWidth" :height="imgHeight" >
      </div>
    </div>
    <div class="header flex align-center space-between">
      <img src="@/assets/img/logo1.png" alt="">
      <router-link :to="{name: 'Home'}" tag="div" class="icon" ><i class="el-icon-s-unfold"></i></router-link>
    </div>
    <div class="mask"></div>
    <div class="info">
      <div class="time">七月4号</div>
      <div class="title">你好，我叫隆杰！</div>
      <div class="content">眼里有光，心中有爱，一路春暖花开，看淡得失，珍惜拥有，不负时光，不负自己，所有美好，都将如期而至</div>
    </div>


    <!-- <el-drawer
      :visible.sync="drawer"
      :show-close="false"
      direction="ttb">
      <div class="navs flex align-center justify-center">
        <div class="nav-name">首页</div>
        <div class="nav-name">Demo</div>
      </div>
    </el-drawer> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgX: 0,
      imgY: 0,
      imgWidth: null,
      imgHeight: null,
      wWidth: 0,
      wHeight: 0,
      drawer: false
    }
  },
  created () {
    const that = this
    let width = document.documentElement.clientWidth * 1.1
    let height = document.documentElement.clientHeight * 1.1
    if (width < 1400) { width = 1400 }
    if (height < 610 ) { height = 610}
    that.imgWidth = width
    that.imgHeight = height
  },
  mounted () {
    const moveDom = document.querySelector(".max")
    this.moveImg(moveDom)
    this.resizeHandle()
  },
  methods: {
    drawHandle () {
      this.drawer = !this.drawer
    },
    moveImg (dom) {
      const wWidth = document.documentElement.clientWidth / 2
      const wHeight = document.documentElement.clientHeight / 2
      const that = this
      dom.addEventListener('mousemove', function (e){
        that.isTransition = null
        let offsetX = (e.clientX - wWidth) / 12;
        let offsetY = (e.clientY - wHeight) / 12;
        that.imgX = -offsetX;
        that.imgY = -offsetY;
      })
    },
    resizeHandle () {
      const that = this
      window.onresize = window.onload = function () {
        let width = document.documentElement.clientWidth * 1.1
        let height = document.documentElement.clientHeight * 1.1
        if (width < 1400) { width = 1400 }
        if (height < 610 ) { height = 610}
        that.imgWidth = width
        that.imgHeight = height
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .max {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    transform-style: preserve-3d;
    position: relative;
    z-index: 9999;
    .img-outer {
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    .move-outer {
      backface-visibility: hidden;
      transition: transform .2s;
      img {
        margin-bottom: 20px;
        top: -30px;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;
        max-width: none;
        display: block;
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
    z-index: 99999;
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
    pointer-events: none;
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
  /deep/ .el-drawer {
    background-color: rgba(255,255,255,.92);
  }
  /deep/ .el-drawer.ttb {

    height: 100% !important;
  }
  .navs {
    margin-top: 5rem;
    font-size: .7rem;
    color: #666
  }
</style>