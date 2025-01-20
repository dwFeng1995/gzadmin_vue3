import {
  createRouter,
  createWebHashHistory
} from "vue-router"
import Home from "@/views/Home.vue"


const routes = [{
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [{
      path: "/dashboard",
      name: "Dashboard",
      meta: {
        title: '系统首页'
      },
      component: () => import( /* webpackChunkName: "dashboard" */ "@/views/Dashboard")
    }]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: '登录'
    },
    component: () => import( /* webpackChunkName: "about" */ "@/views/Login.vue")
  }
  // 404不能写静态路由！ 否则页面刷新的时候会匹配到这里

]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router