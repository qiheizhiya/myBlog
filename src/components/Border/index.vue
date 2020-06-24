<template>
  <div class="gradient-border dayTime" :class="{night: !isDayTime}" ><slot /></div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['isDayTime'])
  }
}
</script>
<style lang="less" scoped>


.gradient-border {
  --border-width: 6px;
  position: relative;
  text-transform: uppercase;
  padding: 50px 20px;
  width: 30vw;
  height: auto;
  border-radius: var(--border-width);
  &::after {
    position: absolute;
    content: "";
    top: calc(-1 * var(--border-width));
    left: calc(-1 * var(--border-width));
    z-index: -1;
    width: calc(100% + var(--border-width) * 2);
    height: calc(100% + var(--border-width) * 2);
    background: linear-gradient(
      60deg,
      #414458,
      #575781,
      #495cd6,
      #272747,
      #888381,
      #7474c5,
      #020411,
      #575781
    );
    background-size: 300% 300%;
    background-position: 0 50%;
    border-radius: calc(2 * var(--border-width));
    animation: moveGradient 4s alternate infinite;
  }
}

@keyframes moveGradient {
  50% {
    background-position: 100% 50%;
  }
}

</style>