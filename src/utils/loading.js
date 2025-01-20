import { ElLoading } from 'element-plus'

let loading

//开启loading
const startLoading = ()=>{
  loading = ElLoading.service({
    lock: true,
    text: '加载中...',
    background: 'rgba(0, 0, 0, 0.2)',
  })     
}

//关闭loading
const closeLoading = ()=>{
    if(loading !== undefined) {
        loading.close()
    }
}

export {
    startLoading,
    closeLoading
}