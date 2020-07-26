import router from './index'

const whiteRouter = ['/login']

const isToken = !!localStorage.getItem('token')

router.beforeEach((to, from, next) => {
  if (isToken) {
    console.log("验证通过")
    next()
  } else { // 没有token
    whiteRouter.includes(to.path) ? next() : next('/login') 
  }
})