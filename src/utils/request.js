import axios from 'axios'
import {startLoading, closeLoading} from '@/utils/loading'
import { baseApi } from '@/utils/baseUrl'
import { ElMessage } from "element-plus"
import store from '@/store/index'
import {logoutHanddel} from '@/hooks/admin.js'
const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    baseURL: baseApi(),
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        startLoading()
        config.headers['Authorization'] = store.getters?.getToken
        return config
    },
    error => {
        console.log('error',error);
        return null
    }
);
service.interceptors.response.use(
    response => {
        closeLoading()
        if (response.status === 200) {
            if(response.data.sub_code === 'NO_LOGIN') {
                ElMessage.error({
                    message: response.data.msg,
                    type: 'error',
                    showClose: true
                })
                logoutHanddel()
            }
            //表示业务上的不成功
            if(response.data.sub_code !== 'SUCCESS' && (response.data.code === 200 || response.data.code === 4001)) {
               ElMessage.error({
                message: response.data.msg,
                type: 'error',
                showClose: true
              })
              return
            }
            //判断头部是否有Authorization
            if(response.headers['authorization']) {
                store.commit('setToken', response.headers['authorization'])
            }
            return response.data.data
        } else {
            return null
        }
    },
    error => {
        closeLoading()
        ElMessage.error({
            message: '服务器错误！',
            type: 'error',
            showClose: true,
            center: true
        })
        console.log('err',error);
        return Promise.reject(error)
    }
)

export default service
