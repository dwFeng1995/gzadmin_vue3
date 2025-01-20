import service from '@/utils/request'

const getCanteenPayTypeList = (params)=>{
    return service({
        url: 'admin/mch/canteenPayType',
        method: 'get',
        params
    })
}

const getCnteenPayTypeDetail = (id)=>{
    return service({
        url: `admin/mch/canteenPayType/${id}`,
        method: 'get'
    })
}

const updateCnteenPayType = (data)=>{
    return service({
        url: `admin/mch/canteenPayType`,
        method: 'post',
        data
    })
}

export  {
    getCanteenPayTypeList as getCanteenPayTypeListApi,
    getCnteenPayTypeDetail as getCnteenPayTypeDetailApi,
    updateCnteenPayType as updateCnteenPayTypeApi
}
