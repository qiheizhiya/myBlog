<template>
  <div class="flex flex-column align-center">
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
      <div class="inputOuter">
        <div class="inputContent">
          <el-input v-model="userName" v-if="!userName" class="userName" placeholder="用户名称" ></el-input>
          <div>
            <transition name="el-fade-in-linear">
              <el-tag effect="dark" closable class="tag" @close="tagClose" v-if="aiteName" size="small">@{{aiteName}}</el-tag>
            </transition>
          </div>
          <el-input type="textarea" :rows="8" placeholder="请输入内容" resize="none" v-model="userContent" class="userContent"> </el-input>
          <Button :styles="{width: '100px', height: '34px', borderRadius: '10px'}" text="提交" @onclick="comment" />
        </div>
      </div>
      <MessageList @reply="reply" :lists="commentList" />
    </div>
  </div>
</template> 

<script>
import marked from "marked";
import "highlight.js/styles/monokai-sublime.css";
import { detail, setLike } from "@/api/article";
import Button from "@c/Button"
import MessageList from "./components/messageList"
import { valiFunc } from '@/utils'
import { updateUserInfo } from '@/api/user'
import { add, list } from "@/api/articleWord"
export default {
  name: "detail",
  components: { Button, MessageList },
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
      isPerfect: true
    };
  },
  async created () {
    await this.getDetail(this.$route.query.id); // 获取详情
    await this.markdownRender() // markdown 加载
    await this.getComData()
    this.isAnyUserName() // 如果该账号已经填了用户名，则不需要填了
  },
  methods: {
    async getDetail(id) {
      const result = await detail(id);
      const data = await this.$store.dispatch('dataHandle', result.data.data)
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
    async comment () {
      const valiData = [ { data: this.userContent, msg: '留言内容不能为空'} ]
      if (!this.userName) { // 如果需要填用户名，则用户名不能为空
        valiData.push({ data: this.userName, msg: '用户名不能为空'})
      }
      const result = await valiFunc(valiData) // 验证没通过
      if (!result) return // 返回
      
      // this.isPerfect && this.setUserNickName()
      const data = {
        articleId: this.$route.query.id,
        userId: JSON.parse(localStorage.getItem('userInfo')).id,
        content: this.userContent
      }
      this.floorId && (data.floorId = this.floorId)
      try {
        const reqResult = await add(data)
        this.userContent = ''
        this.getComData()
        this.$message({
          type: 'success',
          message: '评论成功~~',
          offset: 60
        })
      } catch (e) { }
    },
    // 判断是否需要填用户名
    isAnyUserName () {
      try {
        const userName = JSON.parse(localStorage.getItem('userInfo')).userName
        if (userName) {
          this.userName = userName
          this.isPerfect = false
        }
      } catch (e) {}
    },
    // 如果需要完善用户名，则去完善
    setUserNickName () {
      try {
        updateUserInfo({userName: this.userName, id: JSON.parse(localStorage.getItem('userInfo').userName)})
      } catch (e) {
        console.log(e)
      }
      
    },
    // 获取评论列表
    async getComData () {
      const data = {
        ...this.page,
        articleId: this.detail.id
      }
      const result = await list(data)
      this.commentList = result.data.data
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
        this.$ser(this.detail, 'likeNum', this.detail.likeNum + 1)
      } else {
        this.$message({ type: 'error', message: '您已经喜欢过这篇文章啦~~', offset: 60 })
      }
    }
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
  .inputOuter {    
    margin-bottom: 60px;
  }
  .inputContent {
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px 12px;
    transition: all .3s;
    font-size: 14px;
    color: #333333;
    .tag {
      margin-top: 10px;
      border-radius: 20px;
    }
    .userName, .userContent {
      width: 50%;
      font-size: 14px;
      margin-right: 12px;
      transition: all .3s;
      border: none;
      border-radius: 4px;
      border-bottom: 1px dashed #f0f0f0;
      outline: none;
      /deep/ .el-input__inner {
        border: none;
        border-bottom: 1px dashed #DCDFF6;
        &:focus {
          border-color: #008c8c;
        }
      }
      /deep/ .el-textarea__inner {
        border: 1px dashed #DCDFF6;
        &:focus {
          border-color: #008c8c;
        }
      }
    }
    .submit {
      width: 100px;
      font-size: 14px;
      color: #5f5f5f;
      border-radius: 6px;
      background: #eaeaea;
      cursor: pointer;
      outline: none;
      border: none;
      margin-right: 12px;
      transition: all .3s;
    }
    .userContent {
      width: 100%;
      margin: 10px 0;
    }
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