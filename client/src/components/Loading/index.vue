<template>
  <div class="loader">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>
<style scoped lang="less">
body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #222;
}

.loader {
  position: relative;
  width: 8em;
  height: 8em;
  background: linear-gradient(-225deg, #ff3cac 0%, #562b7c 52%, #2b86c5 100%);
  border-radius: 50%;
  animation: spin 0.5s linear infinite;

  span {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background: inherit;

    &:nth-child(1) {
      filter: blur(5px);
    }

    &:nth-child(2) {
      filter: blur(10px);
    }

    &:nth-child(3) {
      filter: blur(25px);
    }

    &:nth-child(4) {
      filter: blur(50px);
    }
  }

  &::after {
    position: absolute;
    content: "";
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    background: #222;
    border-radius: inherit;
  }
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

</style>