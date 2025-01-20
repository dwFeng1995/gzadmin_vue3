import service from '@/utils/request'

//日志查看列表
const getLogClientDebugList = (params)=>{
    return service({
        url: 'admin/client/logClientDebug',
        method: 'get',
        params
    })
}



export  {
    getLogClientDebugList as getLogClientDebugListApi
}
