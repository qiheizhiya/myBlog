<template>
  <div class="login-form" :class="{dayT: isDayTime}">
  <h1>注册</h1>
  <div class="form-control" >
    <input
      type="text"
      name="username"
      id="username"
      placeholder=" "
      autocomplete="off"
      v-model="userName"
    />
    <label for="username">账号</label>
  </div>
  <div class="form-control">
    <input
      type="password"
      name="password"
      id="password"
      placeholder=" "
      autocomplete="off"
      v-model="password"
    />
    <label for="password">密码</label>
  </div>
  <button type="submit" class="btn" @click="login">注册</button>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Registory',
  computed: {
    ...mapState(['isDayTime'])
  },
  data () {
    return {
      userName: '',
      password: ''
    }
  },
  methods: {
    login () {
      this.$emit('handler', {userName: this.userName, password: this.password, type: 'registory'})
    }
  }
}
</script>
<style lang="less" scoped>

.form-control {
  --default-color: currentColor;
  --invalid-color: #e74c3c;
  --valid-color: #3498db;
  --border-bottom-color: currentColor;

  position: relative;
  border-bottom: 1px solid var(--border-bottom-color);

  &::after {
    position: absolute;
    content: "";
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background: var(--valid-color);
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s;
  }

  &:focus-within::after {
    transform: scaleX(1);
  }

  input {
    padding: 8px 0;
    font-size: inherit;
    font-weight: inherit;
    color: currentColor;
    background: transparent;
    border: none;
    outline: none;
    &:invalid ~ label {
      color: var(--invalid-color);
    }
    &:placeholder-shown ~ label {
      color: var(--default-color);
    }
    &:focus ~ label,
    &:not(:placeholder-shown) ~ label {
      font-size: 18px;
      transform: translateY(-120%) scale(0.75);
    }
  }

  label {
    position: absolute;
    top: 8px;
    font-weight: 500;
    left: 0;
    transition: 0.3s;
    transform-origin: left;
  }
}

.btn {
  position: relative;
  width: 80%;
  padding: 6px 0;
  font-size: 16px;
  color: currentColor;
  background: transparent;
  border: 2px solid hsla(204, 70%, 53%, 1);
  outline: none;
  cursor: pointer;
  overflow: hidden;
  transition: 0.6s;
  border-radius: 4px;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      hsla(204, 70%, 53%, 0.5),
      transparent
    );
    transform: translateX(-100%);
    transition: 0.6s;
  }

  &:hover {
    box-shadow: 0 0 20px 10px hsla(204, 70%, 53%, 0.5);
  }

  &:hover::before {
    transform: translateX(100%);
  }
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  border-radius: 10px;
  &.dayT {
    color: #000000;
  }
  h1 {
    margin: 0 0 24px 0;
    font-size: 36px;
  }

  .form-control {
    margin: 18px 0;
  }

  .btn {
    width: 80%;
    margin: 18px 0 9px 0;
  }
}

</style>