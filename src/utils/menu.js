import { deepCopy } from "@/utils/object"
import router from "@/router/index"
//分组菜单
import { objectArrayAscProp } from '@/utils/array'
const menuGrouping = (menuList) => {
    const parent = deepCopy(menuList).filter(item => item.parent_id === 0).sort(objectArrayAscProp('order'))
    const child = deepCopy(menuList).filter(item => item.parent_id !== 0).sort(objectArrayAscProp('order'))
    const menu = deepCopy(parent).map(item => Object.assign(item, {
        child: deepCopy(child).filter(child => child.parent_id === item.id)
    }))

    return {
        parent,
        child,
        menu
    }
}



//根据后台返回的菜单动态添加子路由
const handelRoutePermission = (routerList, menuList) => {
    //添加动态路由
    menuList.forEach(item => {
        //一级路由
        if (routerList.has(item.route_name)) {
            router.addRoute('Home', {
                path: item.uri,
                name: item.route_name,
                meta: {
                    title: item.title
                },
                component: routerList.get(item.route_name)
            })
        }
        item.child.forEach(child => {
            //二级路由
            if (routerList.has(child.route_name)) {
                router.addRoute('Home', {
                    path: child.uri,
                    name: child.route_name,
                    meta: {
                        title: child.title
                    },
                    component: routerList.get(child.route_name)
                })
            }
        })
    })
    //在最后面添加404路由
    router.addRoute({
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        meta: {
            title: '404页面未找到'
        },
        component: () => import("@/views/NotFound.vue")
    })
}

export {
    menuGrouping,
    handelRoutePermission
}
