<template>
  <div>
    <ul>
      <template v-for="item in navsArr" >
        <li v-if="!item.isHref" :key="item.id">
          <router-link :to="{name:item.to}" tag="a"  >{{item.name}}</router-link>
        </li>
        <li v-else :key="item.id">
          <a :href="item.to">{{item.name}}</a>
        </li>
      </template>
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
          name: "首页"
        },
        {
          id: 1,
          to: "ArticleList",
          name: "我的文章"
        },
        {
          id: 2,
          to: "Demo",
          name: "娱乐"
        },
        {
          id: 3,
          to: "Self",
          name: "个人信息"
        },
        {
          id: 4,
          to: "Message",
          name: "留言版"
        },
        {
          id: 5,
          to: "Photos",
          name: "相册"
        },
        {
          id: 6,
          to: "https://github.com/qiheizhiya/",
          name: "github",
          isHref: true
        },
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

    a {
      position: relative;
      display: block;
      padding: 5px;
      font-size: .6rem;
      color: #ffffff;
      text-decoration: none;
      text-transform: uppercase;
      transition: 0.5s;

      &:hover {
        transform: scale(2);
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