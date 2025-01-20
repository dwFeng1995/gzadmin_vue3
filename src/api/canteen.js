import service from '@/utils/request'
const canteenList = (params)=>{
    return service({
        url: 'admin/company/canteen',
        method: 'get',
        params
    })
}

const createCanteen = (data)=>{
    return service({
        url: 'admin/company/canteen',
        method: 'post',
        data
    })
}

const updateCanteen = (data, id)=>{
    return service({
        url: `admin/company/canteen/${id}`,
        method: 'put',
        data
    })
}

const deleteCanteen = (id)=>{
    return service({
        url: `admin/company/canteen/${id}`,
        method: 'delete'
    })
}

const canteenDetail = (id)=>{
    return service({
        url: `admin/company/canteen/${id}`,
        method: 'get'
    })
}

const lineOrderStatus = ()=>{
    return service({
        url: 'admin/public/orderStatus/take',
        method: 'get'
    })
}

const getCanteenMiniList = (params)=>{
    return service({
        url: 'admin/company/canteen-mini',
        method: 'get',
        params
    })

}

export  {
    canteenList as canteenListApi,
    lineOrderStatus as lineOrderStatusApi,
    createCanteen as createCanteenApi,
    deleteCanteen as deleteCanteenApi,
    canteenDetail as canteenDetailApi,
    updateCanteen as updateCanteenApi,
    getCanteenMiniList as getCanteenMiniListApi
}
