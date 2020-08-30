import { Message } from 'element-ui'
export function debounce(fn, delay) {
  var delay = delay || 200;
  var timer;
  return function () {
    var th = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      timer = null;
      fn.apply(th, args);
    }, delay);
  };
}

export function throttle(fn, delay) {
  var last;
  var timer;
  var interval = interval || 200;
  return function () {
    var th = this;
    var args = arguments;
    var now = +new Date();
    if (last && now - last < interval) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        fn.apply(th, args);
      }, interval);
    } else {
      last = now;
      fn.apply(th, args);
    }
  }
}
export async function valiFunc(arr) {
  let res = true
  for (let item of arr) {
    if (!item.data || item.data.length === 0) {
      res = false
      Message({
        message: item.msg,
        type: 'error',
        offset: 60
      })
      break
    }
  }
  return res
}

export function bottomHandle (isScroll, callback) {
  // window.onscroll = throttle(scrollChange.bind(null, isScroll, callback), 200)
  window.addEventListener('scroll', throttleScroll(isScroll, callback), 200)
}

export function clearBottomHandle () {
  window.removeEventListener('scroll', throttleScroll)
}


function scrollChange (isScroll, callback) {
  if (!isScroll()) return
  const scrollTop = Math.ceil(document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset)
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || window.scrollHeight
  if (scrollTop + windowHeight >= scrollHeight) {
    console.log(scrollTop, windowHeight, scrollHeight)
    callback()
  }
}

// 节流滚动方法
const throttleScroll = (isScroll, callback) => throttle(scrollChange.bind(null, isScroll, callback), 200)

