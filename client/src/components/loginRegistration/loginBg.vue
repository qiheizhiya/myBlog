<template>
  <div class="starArea">
    <div class="moon"></div>
    <div class="star" st v-for="(block, index) in starNum" :style="{ left: block.left + 'px', top: block.top + 'px', animationDelay: block.animationDelay + 's' }" :key="index"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      starNum: new Array(100) // 创建一个长度为100的空数组
    }
  },
  created () {
    this.fillStar()
    this.starPosition()
  },
  methods: {
    starPosition(starCount) {
      this.starNum = this.starNum.map((item, index) => {
        let left = Math.floor(Math.random() * window.innerWidth)
        let top = Math.floor((Math.random() * window.innerHeight) / 1.5)
        let animationDelay = Math.floor(Math.random().toFixed(1) * index)
        const obj = { left, top, animationDelay }
        return obj
      })
    },
    // 填充星星的方法
    fillStar () {
      this.starNum.fill({ left: 0, top: 0, animationDelay: 0 })
    }
  }
};
</script>

<style lang="less" scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.starArea {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-image: linear-gradient(
    to bottom,
    #1b2947,
    #2b3152,
    #3b385d,
    #4c4067,
    #5d4771
  );
  z-index: -99;
}
.moon {
  position: absolute;
  top: 20px;
  right: 40px;
  width: 60px;
  height: 60px;
  background-color: #ffeaa7;
  border-radius: 50%;
  box-shadow: 0 0 20px #ffeaa7;
}
.star {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0.2;
  border: 2px solid transparent;
  border-bottom: 4px solid #fff;
  animation: blingbling 3s linear infinite;
}
.star::before {
  content: "";
  position: absolute;
  top: 4px;
  left: -2px;
  border: 2px solid transparent;
  border-top: 4px solid #fff;
}
@keyframes blingbling {
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.5;
  }
  60% {
    opacity: 1;
  }
  80% {
    opacity: 0.5;
  }
  100% {
    opacity: 0.2;
  }
}
</style>