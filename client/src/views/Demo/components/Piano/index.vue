<template>
  <div class="outer" v-loading.fullscreen.lock="pageLoading">
    <div class="container">
      <div class="item" @mouseenter="pianoMouseEnter(piano.key)" @mouseleave="pianoMouseLeave(piano.key)" @mouseup="pianoMouseUp(piano.key)" @mousedown="pianoMouseDown(piano.key)" v-for="piano of pianoKeys" :data-key="piano.key" :key="piano.key" :ref="piano.key" :style="{left: piano.currentLeft + 'px', width: piano.width + 'px' }" :class="piano.isWhite ? 'white' : 'black' ">
        <span>{{piano.key}}</span>
      </div>
    </div>
  </div>
</template>

<script>
class CreateAudio{
  constructor(key, MIDISound) {
    this.aud = new Audio(MIDISound[key])
    this.timer = null
    this.div = document.querySelector(`div[data-key=${key}]`)
  }
  play () {
    clearInterval(this.timer); // 如果之前还在傻不拉几的减少音量，可以停止了
    this.aud.currentTime = 0; // 把播放进度归零
    this.aud.volume = 1; // 音量最大
    this.aud.play();
    // 2. 更改界面
    // 找到相应的div，加上active样式
    this.div.classList.add("active");
  }
  stop () {
  //1. 停止声音
    this.timer = setInterval(() => {
      // 不断的减少音量
      let v = this.aud.volume - 0.02; // 获取当前音量
      if (v <= 0) {
        // 静音
        this.aud.pause(); // 停止播放
        clearInterval(this.timer); // 不要再计时了
      } else {
        this.aud.volume = v;
      }
    }, 15);
    //2. 更改界面
    // 去掉类样式active
    this.div.classList.remove("active");
  }
}
export default {
  created () {
    this.initUI()
    this.clearSelectOrBindW()
  },
  data () {
    return {
      pianoKeys: [],
      pageLoading: true,
      isDown: false,
      aud: {}
    }
  },
  destroyed () {
    window.onmousedown = null
    window.onmouseup = null
  },
  methods: {
    async initUI() {
      const { default: MIDISound } = await import('./audio')
      const keys = Object.keys(MIDISound)
      //白键的宽度 = 屏幕宽度 / 白键的数量
      const whiteWidth = document.body.clientWidth / 52
      // 当前键的的left值
      let currentLeft = ''
      // 黑键的宽度 = 白键的宽度 * 3/5
      const blackWidth = (whiteWidth * 3) / 5
      // 是否是白棋
      let isWhite = true
      let beforeWhiteNumber = 0; // 前面的白键数量
      for (const key of keys) {
        if (key.length === 2) {
          // 白键
          isWhite = true
          // 白键的坐标 = 前面的白键数量 * 白键的宽度
          currentLeft = beforeWhiteNumber * whiteWidth
          beforeWhiteNumber++
        } else {
          // 黑键
          isWhite = false
          // 黑键的坐标 = 前面的白键数量 * 白键的宽度 - 黑键宽度的一半
          currentLeft = beforeWhiteNumber * whiteWidth - blackWidth / 2
        }
        const obj = { currentLeft, isWhite, key }
        isWhite ? obj.width = whiteWidth : obj.width = blackWidth
        this.pianoKeys.push(obj)
      }
      this.$nextTick(() => {
        this.bindEvent(MIDISound); // 调用自定义函数bindEvent，给div注册各种乱七八糟的事件
      })
    },
    clearSelectOrBindW () {
      document.documentElement.onselectstart = () => false
      window.onmousedown = () => { this.isDown = true }
      window.onmouseup = () => { this.isDown = false }
    },
    bindEvent (MIDISound) {
      for (const key in this.$refs) {
        this.aud[key] = new CreateAudio(key, MIDISound)
      }
      this.pageLoading = false
    },
    pianoMouseDown (key) {
      this.aud[key].play()
    },
    pianoMouseUp (key) {
      this.aud[key].stop()
    },
    pianoMouseEnter (key) {
      if (this.isDown) {
        // 只有鼠标按下时，才会播放
        this.aud[key].play();
      }
    },
    pianoMouseLeave (key) {
      this.aud[key].stop()
    }
  }
};
</script>

<style lang="less" scoped>
.outer {
  background: url('https://efiles.oss-cn-shenzhen.aliyuncs.com/file/pianoBg.jpg');
  width: 100%;
  height: 100%;
  z-index: 2000;
  position: fixed;
  top: 0;
  left: 0;
}
.container {
  height: 150px;
  width: 100%;
  cursor: pointer;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  /* css3属性：box-shadow */
  box-shadow: 0px 0px 10px #00000044;
  .item {
    position: absolute;
    box-sizing: border-box;
    border-radius: 5px;
    top: 0;
    font-size: 12px;
    &.active {
      background: #bd87b0 !important;
    }
    &.white {
      background: #fff;
      height: 100%;
      border: 1px solid #00000044;
      z-index: 1;
      /* 以下属性需要js控制 */
      width: 24px;
      left: 100px;
      color: #000;
    }
    &.black {
      background: #444;
      border: 1px solid #00000088;
      height: 96px;
      color: #fff;
      z-index: 2;
      /* 以下属性需要js控制 */
      width: 20px;
      left: 50px;
    }
    span{
      position: absolute;
      bottom: 5px;
      width: 100%;
      text-align: center;
      word-break: break-all;
      padding: 0 2px;
      box-sizing: border-box;
    }
  }
}
</style>