import { ref, reactive } from "vue"
import { ElMessage } from "element-plus"
import router from "@/router/index"
import store from '@/store/index'
import md5 from "blueimp-md5"
import {loginApi} from '@/api/admin'
import {menuGrouping, handelRoutePermission} from '@/utils/menu'
import dynamicRoutes from '@/router/dynamic.js'

const loginParams = reactive({
    username: "",
    password: ""
})
const rules = {
    username: [
      {
        required: true,
        message: "请输入用户名",
        trigger: "blur",
      },
    ],
    password: [
      { required: true, message: "请输入密码", trigger: "blur" },
    ],
  }
const loginFormRef = ref(null)

const login = ({username, password})=>{
    console.log('loginFormRef',loginFormRef)
    loginFormRef.value.validate(async valid=>{
        if(!valid) {
            console.log('表单验证不正确')
            return
        }
        const res = await loginApi({
            username,
            password: md5(password)
        })
        store.commit("clearTags")
        if(res) {
            const {menu} = menuGrouping(res?.menu_list ?? [])
            console.log(menu,'menu');
            store.commit('setMenu', menu)
            handelRoutePermission(dynamicRoutes, menu)
            ElMessage.success('登录成功!')
            store.commit('setAdminName', username)
            // 登录后跳转到退出前的页面
            router.push({path: router.currentRoute.value.query.lastpath})
        }
    })
}



const logout = ()=>{
    sessionStorage.clear()
    store.commit("clearTags")
    store.commit('removeToken')
    store.commit('removeAdminName')
    store.commit('clearMenu')
    // router.push({path: '/login'})
    location.reload()
}

export {
    rules as loginFormRules,
    loginParams as loginFormParams,
    login as loginHandel,
    loginFormRef,
    logout as logoutHanddel
}
