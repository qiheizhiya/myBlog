import router from './index'

const whiteRouter = ['/login']

router.beforeEach((to, from, next) => {
  const isToken = !!localStorage.getItem('token')
  if (isToken) {
    next()
  } else { // 没有token
    whiteRouter.includes(to.path) ? next() : next('/login') 
  }
})

export default router