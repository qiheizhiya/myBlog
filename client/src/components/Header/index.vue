<template>
  <div class="header" ref="head">
    <div class="left flex align-center">
      <img @click="toIndex" src="@img/textlogo.png" alt />
      <i class="iconfont" @click="changeMusic" :class="isPlay ? 'icon-zanting' : 'icon-bofang'"></i>
    </div>
    <div class="mid" :class="musicIcon==='show' ? 'show' : 'hid'">{{midText}}</div>
    <div class="right flex align-center">
      <i class="iconfont" :class="isLike ? 'icon-xin' : 'icon-xinheart118'" v-if="showLike" @click="$emit('like', isLike)"></i>
      <router-link :to="{name: 'Self'}">
        <img src="https://efiles.oss-cn-shenzhen.aliyuncs.com/file/adminAvatar.jpg" alt />
      </router-link>
      
    </div>
    <div class="progressBar" :style="{width: progressBarWidth + '%'}"></div>
    <div class="music-btn" @click="changeMusic" :class="[musicIcon]">
      <svg
        class="progress-circle"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent" />
        <circle
          class="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
      <span class="iconfont" :class="isPlay ? 'icon-zanting' : 'icon-bofang'"></span>
    </div>
    <audio loop id="music" :src="music"> </audio>
  </div>
</template>

<script>
import { throttle } from '@/utils/index'
export default {
  name: 'HeaderComp',
  props: {
    music: {
      type: String,
      default: 'https://efiles.oss-cn-shenzhen.aliyuncs.com/file/xingzhisuozai.mp3'
    },
    isLike: {
      type: Boolean,
      default: false
    },
    midText: {
      type: String,
      default: '文章列表'
    },
    showLike: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isPlay: false,
      startListen: false,
      dashArray: Math.PI * 100,
      progressBarWidth: 0,
      musicIcon: "",
      audioDom: '', 
      mid: '',
      timer: ''
    };
  },
  computed: {
    dashOffset() {
      return (1 - this.progressBarWidth / 100) * this.dashArray;
    }
  },
  activated () {
    this.listenScroll()
  },
  deactivated () {
    document.body.onscroll = null
    this.audioDom.ontimeupdate = null
    this.startListen = false
    this.timer = null
    this.isPlay = false
  },
  mounted () {
    this.initMusic() // 加载音乐
  },
  created () {
    this.listenScroll() // 是为了防止有些界面是不缓存的情况
    this.mid = this.midText
  },
  methods: {
    // 音乐播放处理
    changeMusic() {
      this.listenPlay()
      this.startListen = true
      !this.isPlay ? this.audioDom.play() : this.audioDom.pause()
      this.isPlay = !this.isPlay
    },
    // 第一次播放的时候开始监听
    listenPlay () {
      if (this.startListen) return
      this.audioDom.ontimeupdate =  () => {
        const currentTime = ( this.audioDom.currentTime / this.audioDom.duration * 100 ).toFixed(0)
        this.progressBarWidth = currentTime
      }
    },
    // 初始化音乐
    initMusic () {
      this.audioDom = document.getElementById("music")
      this.audioDom.load()
    },
    toIndex () {
      this.$router.push({path: '/'})
    },
    // 监听页面滚动
    listenScroll () {
      if (this.timer) return
      this.timer = setTimeout(() => {
        document.body.onscroll = throttle(this.scrollHandle, 200)
      }, 200);
    },
    scrollHandle () {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset 
      scrollTop >= 60 ? this.musicIcon = 'show' : this.musicIcon = 'exit'
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #f6f7f8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;
  padding: 0 15px;
  background: #fff;
  z-index: 99999;
  transition: all 0.3s;
  .left {
    img {
      width: 30px;
      height: auto;
      opacity: 0.8;
      cursor: pointer;
      transition: all .2s;
      &:hover {
        animation: jump 1s infinite alternate
      }
    }
    .iconfont {
      color: #888;
      margin-left: 20px;
      cursor: pointer;
      transition: all .3s;
      &:hover {
        color: #303033
      }
    }
  }
  .mid {
    font-weight: 600;
    transition: all .4s ease-in;
  }
  .mid.hid {
    opacity: 0;
  }
  .right {
    .iconfont {
      font-size: 26px;
      margin: 0 16px;
      cursor: pointer;
      transition: all .3s;
      &.icon-xin {
        color: #ef6d57;
        font-weight: bold;
      }
      &.icon-xinheart118:hover {
        color: #ef6d57;
      }
    }
    img {
      width: 30px;
      height: auto;
      border-radius: 50%;
    }
  }
  .progressBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 50px;
    background-color: #eee;
    z-index: -1;
  }
}

.music-btn {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 36px;
  padding: 3px;
  height: 36px;
  color: #fff;
  opacity: 0.8;
  cursor: pointer;
  z-index: 9999999;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: none;
  .progress-circle {
    height: 30px;
    width: 30px;
    circle {
      stroke-width: 10px;
      transform-origin: center;
      &.progress-background {
        transform: scale(0.9);
        stroke: #fff;
      }
      &.progress-bar {
        transform: scale(0.9) rotate(-90deg);
        stroke: #50bcb6;
      }
    }
  }
  .iconfont {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    &.icon-bofang {
      padding: 1px 0 0 3px;
    }
    font-size: 13px;
    &.icon-pause {
      padding-left: 1px;
    }
  }
}

@media screen and (max-width: 600px) {
  .header {
    position: absolute;
  }
  .mid {
    font-size: 14px;
  }
  .music-btn {
    opacity: 0;
    // display: none;
    &.show {
      display: block;
      visibility: visible;
      animation: fadeInTop 0.6s both;
    }
    &.exit {
      display: block;
      opacity: 0;
      animation: fadeInDown 0.6s both;
    }
  }
}
@keyframes jump {
  0% {
    transform: translateY(0px) scale(1);
  }
  60% {
    transform: translateY(2px) scale(1.1);
  }
  100% {
    transform: translateY(-4px) scale(1);
  }
}
@keyframes fadeInTop {
  from {
    opacity: 0;
    transform: translate(0, 30px);
  }
  to {
    opacity: 1;
    transform: translate(0, 0);
  }
}
@keyframes fadeInDown {
  from {
    opacity: 1;
    transform: translate(0, 0px);
  }
  to {
    opacity: 0;
    visibility: hidden;
    transform: translate(0, 30px);
  }
}
</style>