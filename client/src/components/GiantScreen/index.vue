<template>
  <div class="max">
    <div id="scene" class="img-outer">
      <div  data-depth="0.4" class="move-outer flex align-center justify-center"  >
        <img src="@/assets/img/jm.png" :width="imgWidth" :height="imgHeight" >
      </div>
    </div>
    <!-- <div id="scene" :style="{height:boxH}">
      <div class="layer" data-depth="0.4" :style="layerStyle">
        <img id="image" :style="imgStyle" src="@/assets/img/jm.png" width="1920" height="1080">
      </div>
		</div> -->
    <div class="header flex align-center space-between">
      <img src="@/assets/img/whitelogo.png" alt="">
      <router-link :to="{name: 'Home'}" tag="div" class="icon" ><i class="el-icon-s-unfold"></i></router-link>
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
import { throttle } from '../../../src/utils/index'
import Parallax from 'parallax-js'
export default {
  data () {
    return {
      imgWidth: null,
      imgHeight: null,
      drawer: false
    }
  },
  created () {
    const that = this
    let width = document.documentElement.clientWidth * 1.1
    let height = document.documentElement.clientHeight * 1.2
    if (width < 1400) { width = 1400 }
    if (height < 610 ) { height = 610}
    that.imgWidth = width
    that.imgHeight = height
  },
  mounted () {
    this.resizeHandle()
    const scene = document.getElementById('scene');
		const parallaxInstance = new Parallax(scene, {
			relativeInput: true,
			clipRelativeInput: true,
		})
  },
  destroyed () {
    window.onresize = window.onload = null
  },
  methods: {
    drawHandle () {
      this.drawer = !this.drawer
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
  #scene{
    height: 100%;
    position: relative;
    overflow: hidden;
    #image{
      position: absolute;
      max-width: none;
      display: block;
    }
  }
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
    .time {
      font-size: 14px;
    }
    .title {
      font-size: 1rem;
      margin: 15px 0 30px;
    }
    .content {
      font-size: 15px;
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
  @media screen and (max-width: 900px) {
    .mask {
      clip-path: polygon(0 0,220px 0,700px 100%,0 100%);
    }
  }
  @media screen and (max-width: 780px) {
    .header {
      top: 40px;
      padding: 0 20px;
    }
    .mask {
      clip-path: none
    }
    .info {
      bottom: 8%;
      left: 5%;
      top: auto;
      width: 70%;
      transform: none;
    }
  }
</style>