<template>
  <div class="flex flex-column align-center">
    <Header />
    <div class="list">
      <ul class="monUl">
        <li class="monTitle">Jun, 2020</li>
        <ul class="mContent" v-for="item in 10" :key="item">
          <li class="mCLi flex space-between">
            <div class="mCLeft flex align-center">
              <img src="https://image.raindays.cn/Mood/image/1593794317426.jpg" alt />
              <div class="mCLText flex flex-column space-around">
                <span>微信号可以改了，你还相信时间吗</span>
                <span>42 LIKE / 581 READ</span>
              </div>
            </div>
            <span class="mCRight flex align-center">15th</span>
          </li>
        </ul>
      </ul>
    </div>
    
  </div>
</template>
<script>
import Header from "@c/Header";
export default {
  components: { Header },
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
  @media screen and (max-width: 700px){
    .list {
      width: 100%;
      padding: 80px 20px 20px;
    }
  }
 
</style>