import service from '@/utils/request'

//获取含有支付功能的设备  不分页
const getClientPayList = (params)=>{
    return service({
        url: 'admin/client/payType-mini',
        method: 'get',
        params
    })
}

//食堂设备列表
const getCanteenClientList = (params)=>{
    return service({
        url: 'admin/client/canteenClient',
        method: 'get',
        params
    })
}

//更改是否默认
const updateClientDefault = (id)=> {
    return service({
        url: `admin/client/updateCanteenClientDefault/${id}`,
        method: 'put',
    })
}

//更改是否启用
const updateClientStatus = (id)=> {
    return service({
        url: `admin/client/updateCanteenClientStatus/${id}`,
        method: 'put',
    })
}


const createCanteenClient = (data)=>{
    return service({
        url: 'admin/client/canteenClient',
        method: 'post',
        data
    })
}

//删除
const deleteCanteenClient = (id)=>{
    return service({
        url: `admin/client/canteenClient/${id}`,
        method: 'delete'
    })
}

//详情
const getCanteenClientDetail = (id)=>{
    return service({
        url: `admin/client/canteenClient/${id}`,
        method: 'get'
    })
}

//更新
const updateCanteenClient = (id, data)=>{
    return service({
        url: `admin/client/canteenClient/${id}`,
        method: 'put',
        data
    })
}

export  {
    getClientPayList as getClientPayListApi,
    getCanteenClientList as getCanteenClientListApi,
    updateClientDefault as updateClientDefaultApi,
    updateClientStatus as updateClientStatusApi,
    createCanteenClient as createCanteenClientApi,
    deleteCanteenClient as deleteCanteenClientApi,
    getCanteenClientDetail as getCanteenClientDetailApi,
    updateCanteenClient as updateCanteenClientApi
}
