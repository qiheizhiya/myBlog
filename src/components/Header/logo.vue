<template>
  <div class="text middle">
    <span>L</span>
    <span :class="className">O</span>
    <span :class="className">N</span>
    <span>G</span>
    <span :class="className">J</span>
    <span :class="className">I</span>
    <span :class="className">E</span>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: null,
      className: 'hidden'
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      this.className === 'hidden' ? this.className = 'show' : this.className = 'hidden'
    },1000)
  }
}
</script>
<style lang="less" scoped>
.middle {
  width: 100%;
  display: flex;
  justify-content: center;
}
.text {
  color: #ffffff;
  font-size: 30px;
  font-family: "montserrat";
  font-weight: 900;
  cursor: pointer;
}
.hidden {
  max-width: 0;
  opacity: 0;
  transition: 0.5s ease-in;
}
.show {
  opacity: 1;
  max-width: 1em;
  transition: 0.5s ease-in;
}
.text:hover .hidden {
  opacity: 1;
  max-width: 1em;
}
</style>