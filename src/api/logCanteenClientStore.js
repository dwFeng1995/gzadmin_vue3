import service from '@/utils/request'

const getLogCanteenClientStoreList = (params)=>{
    return service({
        url: 'admin/client/logCanteenClientStore',
        method: 'get',
        params
    })
}

const createLogCanteenClientStore = (data)=>{
    return service({
        url: 'admin/client/logCanteenClientStore',
        method: 'post',
        data
    })
}


export {
    getLogCanteenClientStoreList as getLogCanteenClientStoreListApi,
    createLogCanteenClientStore as createLogCanteenClientStoreApi
}
