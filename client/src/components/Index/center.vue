<template>
  <div id="center">
    <div class="wrapper">
      <div class="slash"></div>
      <div class="sides">
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
        <div class="side"></div>
      </div>
      <div class="text">
        <div class="text--backing">LONGJIE</div>
        <div class="text--left">
          <div class="inner">LONGJIE</div>
        </div>
        <div class="text--right">
          <div class="inner">LONGJIE</div>
        </div>
      </div>
    </div>
    <div class="loading">
      <span class="status online"></span>
      <span class="status invisible"></span>
      <span class="status idle"></span>
      <span class="status offline"></span>
    </div>
    <div class="navgation flex align-center justify-center flex-wrap">
        <i v-for="(item, index) in navgation" @click="triggerPage(item.path)" :key="index" :class="item.icon">
            {{item.name}}
        </i>
    </div>
    <div class="talk-method flex align-center">
      <i class="iconfont icon-weixin1 flex align-center"  ><span >：qwer880620</span> </i>
      <i class="iconfont icon-QQ">：953136447
      </i>
    </div>
  </div>
</template>
<script>
export default {
  name: "center",
  data() {
    return {
       navgation: [
            { name:' exhibit',icon:'iconfont icon-wenzhangguanli', path:'/exhibit' },
            { name:' Article-List',icon:'iconfont icon-wenzhangguanli', path:'/articleList' },
            { name:' Rainy',icon:'iconfont icon-xiangce', path:'/Rainy' },
            { name:' Demo',icon:'iconfont icon-ziyuan', path:'/demo' },
            { name:' Self-info',icon:'iconfont icon-liuyanban', path:'/self' },
            { name:' Leave-message',icon:'iconfont icon-liuyanban', path:'/message' },
            { name:' Login',icon:'iconfont icon-yonghu', path:'/login' },
            { name:' Github',icon:'iconfont icon-GitHub', path:'https://github.com/qiheizhiya/' },
        ]
    };
  },
  methods: {
    triggerPage(path) {
      if (path === "https://github.com/qiheizhiya/") {
        window.open(path);
      } else {
        this.$router.push(path);
      }
    }
  }
};
</script>
<style lang="less" scoped>
*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Josefin Sans, Helvetica, Helvetica Neue, Arial, sans-serif;
  font-weight: normal;
}
.stage {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.wrapper {
  position: relative;
  color: #fff;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.12rem;
  padding-top: 0.33rem;
  padding-left: 0.25rem;
  padding-right: 0.18rem;
  padding-bottom: 0.1rem;
}
.slash {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%) rotate(60deg) scaleY(0);
  transform: translate(-50%, -50%) rotate(60deg) scaleY(0);
  -webkit-transform-origin: center center;
  transform-origin: center center;
  width: 0.075rem;
  height: 145%;
  background: #fff;
  z-index: 4;
  box-shadow: 0 0 10px #27ae60;
  -webkit-animation: slash 6s ease-in infinite;
  animation: slash 6s ease-in infinite;
}
.slash:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 0.37rem;
  height: 120%;
  background: #232323;
  z-index: -1;
}
.slash:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
.sides {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
}
.sides .side {
  position: absolute;
  background: #fff;
}
.sides .side:nth-child(1) {
  top: 0;
  left: 0;
  width: 100%;
  height: 0.07rem;
  -webkit-transform: translateX(-101%);
  transform: translateX(-101%);
  -webkit-animation: side-top ease 6s infinite;
  animation: side-top ease 6s infinite;
  box-shadow: 0 0 10px #ffd700;
}
.sides .side:nth-child(2) {
  top: 0;
  right: 0;
  width: 0.07rem;
  height: 100%;
  -webkit-transform: translateY(-101%);
  transform: translateY(-101%);
  -webkit-animation: side-right ease 6s infinite;
  animation: side-right ease 6s infinite;
  // linear-gradient(125deg,#2980b9,#633bd3,#8e44ad,#192f44,#27ae60);
}
.sides .side:nth-child(3) {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.07rem;
  -webkit-transform: translateX(101%);
  transform: translateX(101%);
  -webkit-animation: side-bottom ease 6s infinite;
  animation: side-bottom ease 6s infinite;
}
.sides .side:nth-child(4) {
  top: 0;
  left: 0;
  width: 0.07rem;
  height: 100%;
  -webkit-transform: translateY(101%);
  transform: translateY(101%);
  -webkit-animation: side-left ease 6s infinite;
  animation: side-left ease 6s infinite;
}
.text {
  position: relative;
}
.text--backing {
  opacity: 0;
}
.text--left {
  position: absolute;
  top: 0;
  left: 0;
  width: 51%;
  height: 100%;
  overflow: hidden;
}
.text--left .inner {
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  -webkit-animation: text-left 6s ease-in-out infinite;
  animation: text-left 6s ease-in-out infinite;
}
.text--right {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
.text--right .inner {
  -webkit-transform: translateX(-200%);
  transform: translateX(-200%);
  -webkit-animation: text-right 6s ease-in-out infinite;
  animation: text-right 6s ease-in-out infinite;
}
@-webkit-keyframes slash {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
  6% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
  }
  13% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
  }
  16.6% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
}
@keyframes slash {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
  6% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
  }
  13% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(1);
  }
  16.6% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
    transform: translate(-50%, -50%) rotate(24deg) scaleY(0);
  }
}
@-webkit-keyframes text-left {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  10% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  58% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  70% {
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
  100% {
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
}
@keyframes text-left {
  0% {
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }
  10% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  58% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  70% {
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
  100% {
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
}
@-webkit-keyframes text-right {
  0% {
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
  10% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  58% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  70% {
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
  100% {
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
}
@keyframes text-right {
  0% {
    -webkit-transform: translateX(-200%);
    transform: translateX(-200%);
  }
  10% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  58% {
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }
  70% {
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
  100% {
    -webkit-transform: translateX(-300%);
    transform: translateX(-300%);
  }
}
@-webkit-keyframes side-top {
  0%,
  14% {
    -webkit-transform: translateX(-101%);
    transform: translateX(-101%);
  }
  24%,
  55% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  65% {
    -webkit-transform: translateX(101%);
    transform: translateX(101%);
  }
  100% {
    -webkit-transform: translateX(101%);
    transform: translateX(101%);
  }
}
@keyframes side-top {
  0%,
  14% {
    -webkit-transform: translateX(-101%);
    transform: translateX(-101%);
  }
  24%,
  55% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  65% {
    -webkit-transform: translateX(101%);
    transform: translateX(101%);
  }
  100% {
    -webkit-transform: translateX(101%);
    transform: translateX(101%);
  }
}
@-webkit-keyframes side-right {
  0%,
  14%,
  23% {
    -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
  30%,
  62% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  72% {
    -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
  100% {
    -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
}
@keyframes side-right {
  0%,
  14%,
  23% {
    -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
  30%,
  62% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  72% {
    -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
  100% {
    -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
}
@-webkit-keyframes side-bottom {
  0%,
  14%,
  24%,
  28% {
    -webkit-transform: translateX(101%);
    transform: translateX(101%);
  }
  37%,
  70% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  79% {
    -webkit-transform: translateX(-101%);
    transform: translateX(-101%);
  }
  100% {
    -webkit-transform: translateX(-101%);
    transform: translateX(-101%);
  }
}
@keyframes side-bottom {
  0%,
  14%,
  24%,
  28% {
    -webkit-transform: translateX(101%);
    transform: translateX(101%);
  }
  37%,
  70% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  79% {
    -webkit-transform: translateX(-101%);
    transform: translateX(-101%);
  }
  100% {
    -webkit-transform: translateX(-101%);
    transform: translateX(-101%);
  }
}
@-webkit-keyframes side-left {
  0%,
  14%,
  24%,
  34%,
  35% {
    -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
  44%,
  79% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  86% {
    -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
  100% {
    -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
}
@keyframes side-left {
  0%,
  14%,
  24%,
  34%,
  35% {
    -webkit-transform: translateY(101%);
    transform: translateY(101%);
  }
  44%,
  79% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  86% {
    -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
  100% {
    -webkit-transform: translateY(-101%);
    transform: translateY(-101%);
  }
}
#center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%; 
  .navgation {
    i {
      margin: .2rem;
    }
  }
  .navgation,
  .talk-method {
    margin: .4rem 0;
    white-space: nowrap;
    font-size: 16px;
    color: white;
    i {
      color: white;
      font-size: 16px;
      transition: all 0.6s;
      cursor: pointer;
    }
    span {
      margin-right: 10px;
      font-size: 14px;
    }
    i:hover {
      color: rgb(66, 245, 135);
      opacity: 0.8;
    }
  }
  .talk-method {
    margin: 0;
  }
  .loading {
    margin: 1rem 0 1rem 0;
    .status {
      position: relative;
      display: inline-block;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      margin: 10px;
    }
    .status.online,
    .status.online:before {
      background: #72ff7d;
    }
    .status.offline,
    .status.offline:before {
      background: #ff4242;
    }
    .status.invisible,
    .status.invisible:before {
      background: #42e5ff;
    }
    .status.idle,
    .status.idle:before {
      background: #ffda72;
    }
    .status:before {
      content: "";
      display: block;
      position: absolute;
      left: -5px;
      top: -5px;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      animation: pulse 1.5s infinite ease-in;
    }
    @keyframes pulse {
      from {
        transform: scale(0.5);
        opacity: 1;
      }
      to {
        transform: scale(1.5);
        opacity: 0;
      }
    }
  }
  .container_img {
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 4rem;
    color: #f2f2f2;
    font-size: 2rem;
  }
  @media screen and(max-width:568px) {
    .container_img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
    img {
      margin-left: -2rem;
    }
  }
}
body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  overflow: hidden;
}
@media screen and (max-width: 700px){
    #center {
      .navgation {
        i {
          margin: 6px;
        }
      }
    }
  }
</style>