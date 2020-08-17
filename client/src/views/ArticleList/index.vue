<template>
  <div class="flex flex-column align-center">
    <Header />
    <div class="list">
      <ul class="monUl" v-for="(item, index) in requestDatas" :key="index">
        <li class="monTitle">{{item[0].month}}, {{item[0].year}}</li>
        <router-link tag="ul" :to="{name: 'Detail', params: {id: thunk.id}}" class="mContent wow fadeInUp" v-for="thunk in item" :key="thunk.id" >
          <li class="mCLi flex space-between">
            <div class="mCLeft flex align-center">
              <img :src="thunk.imgUrl" :title="thunk.title" :alt="thunk.title" />
              <div class="mCLText flex flex-column space-around">
                <span>{{thunk.title}}</span>
                <span>{{thunk.likeNum}} 喜欢 / {{thunk.visitsNum}} 读</span>
              </div>
            </div>
            <span class="mCRight flex align-center">{{thunk.day}}</span>
          </li>
        </router-link>
      </ul>
      <Loader v-if="isLoading" />
      <span class="notMany" v-else>没有更多了~~O(∩_∩)O</span>
    </div>
  </div>
</template>
<script>
import Loader from "@c/Loading"
import { WOW } from 'wowjs'

export default {
  name: 'articleList',
  components: { Loader },
  data () {
    return {
      page: {
        pageSize: 20,
        pageNum: 1
      },
      requestDatas: [],
      total: 0,
      isLoading: false,
      isNext: true
    }
  },
  watch: {
    requestDatas: {
      handler() {
        this.$nextTick(() => {
          new WOW({ live: false, offset: 0 }).init()
        })
      }
    }
  },
  created () {
    this.getArtList()
    this.bottomHandle()
  }, 
  methods: {
    async getArtList () {
      const result = await this.$store.dispatch('getArtList', this.page)
      this.isLoading = false
      this.requestDatas = result.data.data.datas
      this.total = result.data.data.total
      if (this.requestDatas[0].length >= this.total) this.isNext = false
    },
    bottomHandle () {
      window.addEventListener('scroll', () => {
        if (!this.isNext) return
        this.isLoading = true
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if (scrollTop + windowHeight >= scrollHeight) {
          this.num++
          this.page.pageSize += 20
          this.getArtList()
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
  .list {
    width: 640px;
    padding: 80px 0 40px;
    .monUl {
      .monTitle {
        color: #6e7ab5;
        font-weight: 400;
        font-size: 18px;
        margin: 30px 0 10px;
        list-style: none;
        position: relative;
        &::before {
          content: "";
          width: 12px;
          height: 12px;
          display: inline-block;
          background-color: #dce8ec;
          border: 3px solid #afcfff;
          margin-right: 22px;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
      .mContent {
        padding-left: 30px;
        border-left: 1px solid #f3fafd;
        margin-left: 6px;
        .mCLi {
          padding: 25px 0;
          border-bottom: 1px solid #f3fafd;
          .mCLeft {
            img {
              flex-shrink: 0;
              width: 45px;
              height: 45px;
              border-radius: 4px;
              margin-right: 15px;
              overflow: hidden;
              cursor: pointer;
              border: 1px solid #f3fafd;
            }
            .mCLText {
              span:first-of-type {
                color: #5b6773;
                cursor: pointer;
                font-size: 15px;
                padding-bottom: 10px;
                transition: all .6s;
              }
              span:nth-of-type(odd):hover {
                color: #008c8c;
                transform: skewY(2deg);
              }
              span:nth-of-type(even):hover {
                color: #008c8c;
                transform: skewY(-2deg);
              }
              span {
                color: #a1a0d6;
                font-size: 13px;
                letter-spacing: 0;
              }
            }
          }
          .mCRight {
            color: #d2c6a3;
            font-size: 13px;
          }
        }
      }
    }
  }
  .notMany {
    padding: 20px 0 0;
    color: #909090;
    letter-spacing: 2px;
    transition: all .3s;
    border-radius: 4px;
    text-align: center;
    display: inline-block;
    width: 100%;
  }
  @media screen and (max-width: 700px){
    .list {
      width: 100%;
      padding: 80px 20px 20px;
    }
  }
 
</style>