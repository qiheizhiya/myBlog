<template>
  <div class="flex flex-column align-center">
    <Header />
    <div class="detail">
      <h1 class="title">{{detail.title}}</h1>
      <div class="status flex align-center">
        <span>七月 31, 2020</span>
        <span>阅读：{{detail.visitsNum}}</span>
        <span>字数：{{detail.textLen}}</span>
        <span>评论：0</span>
        <span>喜欢: {{detail.likeNum}}</span>
      </div>
      <div class="content markdown-body">
        <div v-html="detail.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { detail } from "@/api/article"
export default {
  data () {
    return {
      detail: {}
    }
  },
  created () {
    const { id } = this.$route.query
    this.getDetail(id)
  },
  methods: {
    async getDetail (id) {
      const result = await detail(id)
      this.detail = result.data.data
    }
  }
}
</script>

<style lang="less" scoped>
  .detail {
    width: 800px;
    .title {
      font-size: 30px;
      padding: 130px 0 22px;
      color: #333;
    }
    .status {
      color: #6a737d;
      position: relative;
      line-height: 22px;
      &::before {
        content: '';
        width: 100%;
        height: 1px;
        background: #eaeaeaa6;
        position: absolute;
        left: 0;
        bottom: -30px;
      }
      span {
        font-size: 13px;
        margin-right: 10px;
      }
    }
    .content {
      padding: 100px 0;
      font-size: 14px;
    }
  }

  @media screen and (max-width: 800px) {
    .detail {
      width: 90%;
    }
  }

  
</style>
<style lang="less">
.markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
}

@media screen and (min-width: 968px){
  .markdown-body {
    font-size: 16px !important;
  }
}

@media (max-width: 767px) {
    .markdown-body {
        padding: 15px;
    }
}
</style>