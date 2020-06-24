<template>
  <div class="footer flex align-center justify-center ">
    <img src="@/assets/img/wxImg.jpg" alt="" class="wxImg">
    <div class="flex align-center justify-center">
      Copyright 2020 © LongJie.粤ICP备20043000号
    </div>

  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
  .footer {
    width: 100%;
    height: 10vh;
    background: linear-gradient(#414458, #575781);
    color: #ffffff;
    z-index: 999;
    .wxImg {
      width: 80px;
      height: auto;
      margin-right: 20px;
    }
  }
</style>