import router from "@/router/index"
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import dynamicRoutes from '@/router/dynamic.js'
import {handelRoutePermission} from '@/utils/menu'

//菜单列表
const menuList = store?.getters?.getMenuList  ?? []


NProgress.configure({
    easing: 'ease',  // 动画方式
    speed: 500,  // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
})

let registerRouteFresh = true   //为true的时候 表示页面刷新或者第一次加载
router.beforeEach((to, from, next)=>{
    document.title = to?.meta?.title
    if(store?.getters?.getToken) {
        if(to.path === '/login') {
            NProgress.start()
           next({path: '/'})
        }else {
            // 如果首次或者刷新界面，next({...to, replace: true})会循环遍历路由
            // 如果to找不到对应的路由那么他会再执行一次beforeEach((to, from, next))直到找到对应的路由
            // 我们的问题在于页面刷新以后执行添加动态路由的方法，
            // 直接执行next()感觉路由添加了但是在next()之后执行的，所以我们没法导航到相应的界面。
            // 这里使用变量registerRouteFresh变量做记录，直到找到相应的路由以后，把值设置为false然后走else执行next(),整个流程就走完了，路由也就添加完了。
            if (registerRouteFresh) {
                handelRoutePermission(dynamicRoutes, menuList)
                next({...to, replace: true})
                registerRouteFresh = false
            }else {
                NProgress.start()
                next()
            }
        }

   } else {
       if(to.path !== '/login') {
         next({path: '/login',query : {
             "lastpath" : to.path
         }})
       }
       next()
   }
})

router.afterEach(()=>{
    NProgress.done()
})

