<template>
  <div>
    <button class="btn btn-gradient" @click="click" :style="styles">{{text}}</button>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '注册'
    },
    styles: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    click () {
      this.$emit('onclick')
    }
  }
}
</script>
<style scoped lang="less">
.btn {
  position: relative;
  text-decoration: none;
  background-color: white;
  border: transparent;
  outline: transparent;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  animation: glow 8s linear infinite;

  &-gradient {
    color: white;
    background: linear-gradient(90deg, #00dbde, #fc00ff, #00dbde);
    background-size: 300%;
    border-radius: 2em;

    &::before {
      position: absolute;
      content: "";
      top: -5px;
      left: -5px;
      bottom: -5px;
      right: -5px;
      z-index: -1;
      background: inherit;
      background-size: inherit;
      border-radius: 4em;
      opacity: 0;
      transition: 0.5s;
    }

    &:hover::before {
      opacity: 1;
      filter: blur(20px);
      animation: glow 8s linear infinite;
    }
  }
}

@keyframes glow {
  to {
    background-position: 300%;
  }
}

</style>