<template>
  <div>
    <ul>
      <template v-for="item in navsArr" >
        <li v-if="!item.isHref" :key="item.id">
          <router-link  class="flex align-center" :to="{name:item.to}" tag="a"  ><i :class="item.icon"></i>{{item.name}}</router-link>
        </li>
        <li  v-else :key="item.id">
          <a class="flex align-center" :href="item.to"><i :class="item.icon"></i>{{item.name}}</a>
        </li>
      </template>
      <li>
        <router-link  class="flex align-center" :to="{name: 'Login'}" tag="a"  ><i class="iconfont icon-zhucehuise"></i>登陆/注册</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      navsArr: [
        {
          id: 0,
          to: "Home",
          name: "首页",
          icon: 'iconfont icon-ico-'
        },
        {
          id: 1,
          to: "ArticleList",
          name: "我的文章",
          icon: 'iconfont icon-wenzhangguanli'
        },
        {
          id: 2,
          to: "Demo",
          name: "娱乐",
          icon: 'iconfont icon-ziyuan'
        },
        {
          id: 3,
          to: "Self",
          name: "个人信息",
          icon: 'iconfont icon-yonghu'
        },
        {
          id: 4,
          to: "Message",
          name: "留言版",
          icon: 'iconfont icon-liuyanban'
        },
        {
          id: 5,
          to: "Photos",
          name: "相册",
          icon: 'iconfont icon-xiangce'
        },
        {
          id: 6,
          to: "https://github.com/qiheizhiya/",
          name: "github",
          isHref: true,
          icon: 'iconfont icon-GitHub'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
ul {
  display: flex;
  color: #000000;
  list-style-type: none;

  &:hover {
    li a {
      transform: scale(1.2);
      opacity: 0.5;
      filter: blur(2px);
    }
  }

  li {
    margin: 1em;
    .iconfont {
      color: #ffffff;
    }
    a {
      position: relative;
      display: block;
      padding: 5px;
      font-size: .9rem;
      color: #ffffff;
      text-decoration: none;
      text-transform: uppercase;
      transition: 0.5s;
      .iconfont {
        font-size: 14px;
        margin: 0 2px;
      }
      &:hover {
        transform: scale(1.5);
        opacity: 1;
        filter: blur(0);
      }

      &::before {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        background: #ff5252;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s;
      }

      &:hover::before {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }
}
</style>