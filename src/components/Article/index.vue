<template>
  <div>
    <div class="article flex align-center" v-for="item in 3" :key="item.id">
      <div class="img-outer">
        <img src="https://image.raindays.cn/Mood/image/1593794317426.jpg" alt />
      </div>
      <div class="text-outer">
        <div class="info" >
          <div class="time" >六月 15, 2020</div>
          <div class="title" >
            <a >微信号可以改了，你还相信时间吗</a>
          </div>
          <div class="description" >
            终于，在千呼万唤中，微信终于可以修改微信号啦！
            微信官宣了这一消息，几亿用户奔走相告沸腾不已，众人瞩目的微信每次出一...
          </div>
          <div class="handle">
            123123 243113 12331
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
.article {
  &:not(:first-of-type) {
    margin-top: 100px;
  }
  &:nth-of-type(odd) {
    flex-direction: row-reverse;
  } 
  .img-outer {
    width: 680px;
    height: 440px;
    font-size: 0;
    position: relative;
    cursor: pointer;
    z-index: 3;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid #f3fafd;
    transition: all .3s;
    flex: 0 0 auto;
  }
  .text-outer {
    padding: 80px 100px 0 80px;
    border: 1px solid #eaeaea;
    border-radius: 6px;
    height: 400px;
    .info {
      .time {
        color: #999;
        font-size: 12px;
      }
      .title {
        margin: 8px 0 2px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-weight: 500;
        a {
          font-size: 24px;
          line-height: 30px;
          cursor: pointer;
        }
      }
      .description {
        color: #666;
        font-size: 14px;
        line-height: 22px;
        margin-top: 10px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .handle {
        margin-top: 60px;
        font-size: 12px;
        color: #999;
        display: flex;
      }
    }
  }
}
</style>