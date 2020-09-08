<template>
  <div class="blocks flex" >
    <div class="item" v-for="(item, index) in demos" :key="item.id" :class="{ active: item.active }" :style="{ width: item.width }" @click="showItem(index)">
      <div class="bg" :style="{ backgroundImage: `url(${item.bgSrc})`}"></div>
      <transition name="el-fade-in">
        <h2 v-show="item.width !== '0%'">{{item.name}}</h2>
      </transition>
    </div>
    <transition name="el-fade-in">
      <i class="btnClose iconfont icon-wei-" v-show="showClose" @click="clearAct"></i>
    </transition>
    <transition name="comFade">
      <keep-alive>
        <component :is="componentIs"></component>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { setTimeout } from 'timers'
import Piano from './components/Piano'
export default {
  name: 'demo',
  components: { Piano },
  data () {
    return {
      demos: [
        { id: 0, bgSrc: 'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/demoImg1.jpg', name: '钢琴', active: false, width: '25%' },
        { id: 1, bgSrc: 'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/demoImg2.jpg', name: '贪吃蛇', active: false, width: '25%' },
        { id: 2, bgSrc: 'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/demoImg3.jpg', name: '跳跳鸟', active: false, width: '25%' },
        { id: 3, bgSrc: 'https://qiheizhiya.oss-cn-shenzhen.aliyuncs.com/image/demoImg4.jpg', name: '音乐播放器', active: false, width: '25%' },
      ],
      showClose: false,
      loading: false,
      componentIs: '',
      componentNames: ['Piano', false, false, false]
    }
  },
  methods: {
    showItem (index) {
      this.demos.forEach((item, i) => {
        if (i === index) { this.$set(item, 'active', true); this.$set(item, 'width', '100%') }
        else { this.$set(item, 'active', false); this.$set(item, 'width', '0%') }
      })
      this.showClose = true
      const showName = this.componentNames[index]
      if (!showName) { this.$message({ duration: 1000, type: 'warning', message: '敬请期待~~~' }); return}
      setTimeout(() => {
        this.componentIs = showName
      }, 500)
    },
    clearAct () {
      this.demos.forEach(item => { this.$set(item, 'active', false); this.$set(item, 'width', '25%') })
      this.componentIs = ''
      this.showClose = false
    }
  }
}
</script>

<style lang="less" scoped>
.blocks {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #111523;
  color: #fff;
  cursor: pointer;
  .item {
    height: 100%;
    position: relative;
    transition: 0.5s;
    overflow: hidden;
    h2 {
      margin: 0;
      font-size: 36px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &:hover .bg, &.active .bg {
      opacity: 0.3;
      background-size: 110% auto;
    }
  }
  .bg {
    position: absolute;
    opacity: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-attachment: fixed;
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: center;
    transition: 0.5s;
  }
}
.btnClose {
  position: fixed;
  right: 10px;
  top: 20px;
  font-size: 2em;
  color: #008C8C;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
  z-index: 9999;
}
.btnClose:hover {
  transform: scale(1.2);
}
.comFade-leave-active {
  transition: all .6s ease-out;
  opacity: 0;
}
.comFade-enter-active {
  transition: all .5s ease-out;
}
.comFade-enter {
  opacity: 0;
}
</style>