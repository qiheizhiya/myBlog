<template>
  <div>
    <Header />
    <div class="content markdown-body">
      <div v-html="content" v-highlight></div>
      <div class="me flex">
        <div class="block flex align-center ">
          <i class="iconfont icon-weixin1"></i>
          <div class="hide-block">
            <img src="https://efiles.oss-cn-shenzhen.aliyuncs.com/file/wxImg.jpg" alt="">
          </div>
        </div>
        <div class="block flex align-center ">
          <i class="iconfont icon-QQ"></i>
          <div class="hide-block flex align-center justify-center">
            <span>953136447</span>
          </div>
        </div>
        <div class="block flex align-center ">
          <a href="https://github.com/qiheizhiya/myBlog" target="_blank">
            <i class="iconfont icon-GitHub"></i>
          </a>
          <div class="hide-block flex align-center justify-center">
            <span>这个项目的开源地址，来个star吧~谢谢</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import { getAboutMe } from "@/api/user";
export default {
  created() {
    this.getDetail()
  },
  data () {
    return {
      content: '',
    }
  },
  methods: {
    markdownRender(content) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
      });
      this.content = marked(content);
    },
    async getDetail () {
      const result = await getAboutMe()
      console.log(result.data)
      this.markdownRender(result.data.data.aboutMe)
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 80px 0 0px;
}
/deep/ .markdown-body {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 100px 20px 40px;
  box-shadow: none!important;
  min-height: auto;
  font-size: 16px;
  line-height: 1.5;
  color: #24292e;
  h1 {
    border-bottom: 0;
  }
  p {
    line-height: 30px;
    margin: 0 0 18px;
    font-size: 16px;
  }
  ul {
    margin: 0 0 18px;
    padding-left: 20px;
    li {
      font-size: 16px;
      margin: 0 0 8px;
      line-height: 28px;
      list-style: none;
      position: relative;
      &::before {
        content: '✧';
        font-size: 8px;
        position: absolute;
        top: 0;
        left: -16px;
      }
    }
  }
}
.me {
  margin-top: 40px;
  .block {
    position: relative;
    margin-right: 13px;
    i {
      background: #cacaca;
      color: #fff;
      border-radius: 50%;
      font-size: 18px;
      height: 30px;
      display: inline-block;
      width: 30px;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
      transition: all .4s;
    }
    .hide-block {
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 170px;
      border-radius: 5px;
      padding: 8px;
      margin-bottom: 20px;
      color: #fff;
      font-size: 14px;
      opacity: 0;
      visibility: hidden;
      transition: all .6s;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%,20px);
        border: 10px solid transparent;
      }
      span {
        text-align: center;
      }
    }
    &:hover {
      .hide-block {
        opacity: 1;
        visibility: visible;
      }
    }
    &:first-of-type:hover {
      i {
        background: #0cd438;
      }
      .hide-block {
        background-color: #0cd438;
        box-shadow: 0 0 10px #0cd438;
        &::after {
          border-top-color: #0cd438;
        }
      }
    }
    &:nth-of-type(2):hover {
      i {
        background-color: rgb(230, 55, 55);
      }
      .hide-block {
        background-color: rgb(230, 55, 55);
        box-shadow: 0 0 10px rgb(230, 55, 55);
        &::after {
          border-top-color: rgb(230, 55, 55);
        }
      }
    }
    &:nth-of-type(3):hover {
      i {
        background-color: #000;
      }
      .hide-block {
        background-color: #000;
        box-shadow: 0 0 10px #000;
        &::after {
          border-top-color: #000;
        }
      }
    }
  }
}
@media screen and (max-width: 700px){
  .me {
    justify-content: center;
  }
}
</style>