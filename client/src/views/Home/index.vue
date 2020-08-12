<template>
  <div class="Maskparent">
    <div id="Maske">
      <Center class="center" />
      <div class="bg"></div>
    </div>
  </div>
</template>
<script>
import Center from "@c/Index/center";
import { addUser } from "@/api/user"
export default {
  name: "maske",
  components: {
    Center
  },
  async created () {
    if (!localStorage.getItem('userInfo')) { // 如果用户进入首页没有用户信息，贼去注册
      const result = await addUser({account: Date.now()})
      localStorage.setItem('userInfo', JSON.stringify(result.data.data))
    }
  }
};
</script>
<style lang="less" scoped>
#Maske {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.5s;
  z-index: 5;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
  }
  .bg {
    width: 120%;
    height: 100vh;
    animation: change 15s infinite ;
    background: linear-gradient(125deg,#2980b9,#633bd3,#8e44ad,#192f44,#27ae60);
    background-size: 800%;
    z-index: -99;
  }
  @keyframes change {
    0% { background-position-x: 0%;}
    50% { background-position-x: 100%; }
    100% { background-position-x: 0%;}
  }
}
</style>