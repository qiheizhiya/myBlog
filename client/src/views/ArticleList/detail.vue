<template>
  <div class="flex flex-column align-center">
    <Header />
    <div class="detail">
      <h1 class="title">此刻正在聆听的你，今天过得好么</h1>
      <div class="status flex align-center">
        <span>七月 31, 2020</span>
        <span>阅读：0</span>
        <span>字数：0</span>
        <span>评论：0</span>
        <span>喜欢: 0</span>
      </div>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<script>
import { detail } from "@/api/article"
export default {
  data () {
    return {

    }
  },
  created () {
    const { id } = this.$route.query
    this.getDetail(id)
  },
  methods: {
    async getDetail (id) {
      const result = await detail(id)
      console.log(result)
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