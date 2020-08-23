<template>
  <div class="flex flex-column align-center">
    <scrollBar/>
    <Header @like="likeChange" :isLike="detail.isLike" :midText="detail.title" :showLike="true" :music="detail.musicUrl" />
    <div class="detail">
      <h1 class="title">{{detail.title}}</h1>
      <div class="status flex align-center">
        <span>{{detail.month}} {{detail.day}}, {{detail.year}}</span>
        <span>阅读：{{detail.visitsNum}}</span>
        <span>字数：{{detail.textLen}}</span>
        <span>评论：{{commentList.total}}</span>
        <span>喜欢: {{detail.likeNum}}</span>
      </div>
      <div class="content markdown-body">
        <div v-html="content" v-highlight></div>
      </div>
      <div id="hash"></div>
      <MessageInput :aiteName="aiteName" @tagClose="tagClose" @comment="comment" /> 
      <MessageList @reply="reply" :lists="commentList" :isLoading="isLoading" :isNext="isNext" />
    </div>
  </div>
</template> 

<script>
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import { detail, setLike } from "@/api/article";
import MessageList from "./components/messageList"
import scrollBar  from './components/scrollBar'
import MessageInput from './components/messageInput'
import { add, list } from "@/api/articleWord"
import { bottomHandle } from '@/utils'

export default {
  name: "detail",
  components: { MessageList, scrollBar, MessageInput },
  data() {
    return {
      detail: {},
      commentList: [],
      userName: '',
      aiteName: '',
      floorId: '',
      userContent: '',
      content: '',
      page: {
        pageSize: 10,
        pageNum: 1,
      },
      len: 0,
      isLoading: false,
      isNext: true
    };
  },
  async created () {
    await this.getDetail(this.$route.params.id, JSON.parse(localStorage.getItem('userInfo')).id); // 获取详情
    await this.markdownRender() // markdown 加载
  },
  mounted () {
    this.getComData() // 加载留言列表
    bottomHandle(()=> this.isNext, () => { // 触底监听事件
      this.isLoading = true
      this.page.pageSize += 10
      this.getComData()
    })
  },
  methods: {
    async getDetail(id, userId) {
      const result = await detail(id, userId);
      const data = await this.$store.dispatch('dataHandle', result.data.data)
      document.title = data.title // 动态设置页面的title
      this.detail = data;
    },
    markdownRender() {
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
      this.content = marked(this.detail.content)
    },
    // 子层评论
    reply (data) {
      this.aiteName = data.userName
      this.floorId = data.parentId
    },
    // 清楚掉aite后 删除艾特信息
    tagClose () {
      this.aiteName = ''
      this.floorId = ''
    },
    // 评论提交
    async comment (content) {
      const data = {
        articleId: this.$route.params.id,
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        content
      }
      this.floorId && (data.floorId = this.floorId)
      try {
        const reqResult = await add(data)
        this.getComData()
        this.$message({
          type: 'success',
          message: '评论成功~~',
          offset: 60
        })
      } catch (e) { }
    },
    
    // 获取评论列表
    async getComData () {
      const data = {
        ...this.page,
        articleId: this.$route.params.id
      }
      const result = await list(data)
      const { len, total } = result.data.data
      setTimeout(() => {
        this.commentList = result.data.data
        console.log(this.commentList)
        this.len += len
        this.isNext = this.len < total
        this.isLoading = false
      }, 1000)
    },
    // 设置喜欢这篇文章
    async likeChange (e) {
      if (!e) { // 未喜欢这篇文章
        const data = {
          articleId: this.detail.id,
          userId: JSON.parse(localStorage.getItem('userInfo')).id
        }
        const result = await setLike(data)
        this.$message({ type: 'success', message: '相识虽浅,似是经年', offset: 60 })
        this.$set(this.detail, 'isLike', true)
        this.$set(this.detail, 'likeNum', this.detail.likeNum + 1)
      } else {
        this.$message({ type: 'error', message: '您已经喜欢过这篇文章啦~~', offset: 60 })
      }
    },
  }
};
</script>

<style lang="less" scoped>
#hash {
  margin-bottom: 100px;
}
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
      content: "";
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
    padding-top: 100px;
    font-size: 14px;
  }
  
}

@media screen and (max-width: 800px) {
  .detail {
    width: 90%;
  }
}
@media screen and (max-width: 600px) {
  .detail {
    .content {
      padding-top: 60px;
    }
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
.markdown-body pre {
  background-color: #353535 !important;
  border-radius: 12px !important;
  font-size: 90% !important;
}
@media screen and (min-width: 968px) {
  .markdown-body {
    font-size: 16px !important;
  }
}
.hljs-comment {
  color: #848991 !important;
}
.hljs-keyword {
  color: #6ab0f3 !important;
}
code {
  color: #b3b9c5 !important;
  font-weight: 400 !important;
}
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>