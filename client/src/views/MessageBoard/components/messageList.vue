<template>
  <div class="message">
    <div class="messageList fadeInUp" :class="`wow${list.index}`"  v-for="list in datas" :key="list.id">
      <div class="parent">
        <div class="ml-info flex align-center space-between">
          <div class="avatar-name flex align-center">
            <img :src="list.user.avatar" />
          </div>
          <div class="reply-date flex align-center space-between">
              <div class="name flex align-center">{{list.user.userName}}<el-tag class="master" effect="dark" size="mini" v-if="list.user.id === 1">站主</el-tag> </div>
              <div class="flex algin-center">
                <div class="date">{{list.createdAt}}</div>
              </div>
          </div>
        </div>
        <div class="ml-result">{{list.content}}</div>
      </div>
    </div>
    <div class="loader flex align-center justify-center">
      <Loader v-show="isLoading && !pageLoad"/>
      <span class="notMany" v-show="!isLoading && !isNext">没有更多留言了~~O(∩_∩)O</span>
    </div>
  </div>
</template>

<script>
import Loader from "@c/Loading"
import { WOW } from 'wowjs'

export default {
  props: {
    datas: {
      type: [Array, Object],
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    isNext: {
      type: Boolean,
      default: true
    },
    pageLoad: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    datas() {
      this.$nextTick(() => {
        new WOW({ live: false, offset: 0,boxClass: `wow${this.wowNum}`, }).init()
        this.wowNum++
      })
    }
  },
  data () {
    return {
      wowNum: 0
    }
  },
  components: { Loader }
};
</script>

<style lang="less" scoped>
.message {
  width: 100%;
  color: #333;
  font-weight: 400;
  margin-bottom: 20px;
  display: inline-block;
  position: relative;
  .messageList {
    padding: 25px 0;
    border-bottom: 1px solid #f6f7f8;
    &:first-of-type {
      margin-top: 16px;
    }
    .parent:hover, .children:hover {
        .reply {
            opacity: 1 !important;
        }
    }
    .ml-info {
      .avatar-name {
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          margin-right: 12px;
        }
      }
      .reply-date {
        flex: 1;
        position: relative;
        .reply {
          opacity: 0;
          font-size: 12px;
          color: #89b603;
          margin-right: 12px;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: underline;
          text-transform: capitalize;
        }
        .date {
          color: #999;
          font-size: 13px;
          letter-spacing: 0;
        }
        .name {
          font-weight: 400;
          color: #89b603;
          font-size: 16px;
          height: 20px;
          transition: all 0.3s;
          position: relative;
          border-bottom: 1px dashed #89b60331;
          .master {
            border-bottom: none;
            font-size: 12px;
            margin-left: 10px;
          }
        }
      }
      
    }
    .ml-result {
      color: #303030;
      line-height: 22px;
      padding-left: 52px;
      white-space: pre-wrap;
      font-size: 14px;
    }
  }
}
.loader {
  height: 50px;
  margin-top: 30px;
  .notMany {
    letter-spacing: 2px;
    height: 34px;
    line-height: 36px;
    padding: 0 36px;
    color: #909090;
    border-bottom: none !important;
    font-size: 14px;
  }
}
@media screen and (max-width: 600px){
  .loader {
    height: 30px;
    margin-top: 20px;
  }
  .message {
    .messageList {
      .ml-info {
        .avatar-name {
          img {
            width: 36px;
            height: 36px;
          }
          span {
            font-size: 13px;
          }
        }
        .reply-date {
          display: block;
          .name {
            font-size: 13px;
            display: block;
            border-bottom: none;
            margin-bottom: 2px;
            .master {
              font-size: 10px;
              margin-left: 10px;
            }
            /deep/ .el-tag--mini {
              height: 16px;
              line-height: 15px;
              padding: 0 3px;
            }
          }
          .reply {
            opacity: 1;
            position: absolute;
            right: 0;
            bottom: 14px;
          }
          .date {
            font-size: 12px;
          }
        }
        
      }
      .ml-result {
        font-size: 12px;
        padding-left: 0;
        margin-top: 10px;
      }
    }
  }
}
</style>