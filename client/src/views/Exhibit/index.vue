<template>
  <div class="outer">
    <GiantScreen />
    <div class="content-wrap">
      <Article :datas="requestDatas" :isLoading="isLoading" />
    </div>
  </div>
</template>
<script>
import GiantScreen from '@c/GiantScreen/index'
import Article from '@c/Article/index'
export default {
  name: 'home',
  components: { GiantScreen, Article },
  data () {
    return {
      requestDatas: [],
      total: '',
      page: {
        pageSize: 10,
        pageNum: 1,
        isHome: true
      },
      isLoading: false,
      isNext: true
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
      const datas = result.data.data.datas
      datas.forEach(item => this.$store.dispatch('dataHandle', item))
      console.log(datas)
      this.requestDatas = datas
      this.total = result.data.data.total
      if (this.requestDatas.length >= this.total) this.isNext = false
    },
    bottomHandle () {
      window.addEventListener('scroll', () => {
        if (!this.isNext) return
        this.isLoading = true
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
        if (scrollTop + windowHeight >= scrollHeight) {
          this.page.pageSize += 10
          this.getArtList()
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.outer {
  overflow: hidden;
}
.content-wrap {
  position: relative;
  padding: 100px 0 ;
  &::after {
    content: '';
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    position: absolute;
    background: #eaeaea;
    z-index: 0;
    width: 1px;
    height: 100%;
  }
}
@media screen and (max-width: 1200px) {
  .content-wrap {
    width: 900px; 
  }
}
@media screen and (max-width: 900px) {
  .content-wrap {
    width: 100%
  }
}
</style>