<template>
  <div class="flex align-center space-between">
    <div class="loader flex align-center justify-center">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<style scoped lang="less">
.loader {
  width: 100%;
}
span {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  animation: slide 1s infinite;
  display: inline-block;
  margin: 0 2px;
  &:nth-of-type(1) {
    animation-delay: 0.1s;
    background: #32aacc;
  }
  &:nth-of-type(2) {
    animation-delay: 0.2s;
    background: #64aacc;
  }
  &:nth-of-type(3) {
    animation-delay: 0.3s;
    background: #96aacc;
  }
  &:nth-of-type(4) {
    animation-delay: 0.4s;
    background: #c8aacc;
  }
  &:nth-of-type(5) {
    animation-delay: 0.5s;
    background: #faaacc;
  }
}

@keyframes slide {
  0% {
    ransform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>