<template>
  <div class="shadow">
    <div class="card">
      <div class="card-header">Contact</div>
      <div class="card-body">
        <dl>
          <span>
            <dt>
              <a href="https://github.com/qiheizhiya/" target="_blank">
                <i class="iconfont icon-GitHub"></i>
              </a>
            </dt>
            <dd>qiheizhiya</dd>
          </span>
          <span>
            <dt>
               <i class="iconfont icon-weixin1"></i>
            </dt>
            <dd>qwer880620</dd>
          </span>
          <span>
            <dt>
              <i class="iconfont icon-QQ"></i>
            </dt>
            <dd>953136447</dd>
          </span>
        </dl>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
i {
  color: #000;
  margin-right: 6px;
}
.shadow {
  filter: drop-shadow(-2px 2px 8px rgba(50, 50, 0, 0.5));
}
.card {
  clip-path: inset(0 0 70% 0);
  transform: translateY(30%);
  transition: 0.5s ease;

  .card-header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
    font-size: 1.2em;
    color: white;
    background-color: #2979ff;
    clip-path: inset(0 19% 0 19%);
    transition: 0.5s ease;
  }

  .card-body {
    box-sizing: border-box;
    padding: 1.25em;
    width: 100%;
    height: 225px;
    font-size: 1.2em;
    background: white;
    clip-path: inset(0 19% 0 19%);
    transition: 0.5s ease;

    dl {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      margin: 0;
    }

    span {
      opacity: 0;
      transform: translateY(100%);
      transition: 0.5s ease-in;

      dt,
      dd {
        display: inline;
        margin: 0;

        svg {
          margin-right: 0.3em;
        }
      }
    }
  }

  &:hover {
    transform: translateY(0);
    clip-path: inset(0 0 0 0);

    .card-header,
    .card-body {
      clip-path: inset(0 0 0 0);
    }

    span {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>