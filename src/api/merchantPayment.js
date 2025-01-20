import service from '@/utils/request'

const getMerchantPaymentList = (params)=>{
    return service({
        url: 'admin/mch/company',
        method: 'get',
        params
    })
}

//获取对应企业的支付平台显示
const getMerchantPlatformminiList = (params)=>{
    return service({
        url: 'admin/mch/platform-mini',
        method: 'get',
        params
    })
}

//获取所有支付平台
const getPlatformAlliList = (params)=>{
    return service({
        url: 'admin/mch/platform-all',
        method: 'get',
        params
    })
}
const getAllPayPlatForm = (params)=>{
    return service({
        url: 'admin/mch/platFrom-all',
        method: 'get',
        params
    })
}

//新增企业商户
const addCompanyForm = (data)=>{
    return service({
        url: 'admin/mch/company',
        method: 'POST',
        data
    })
}

//更新企业商户
const updateCompanyForm = (data,id)=>{
    return service({
        url: `admin/mch/company/${id}`,
        method: 'PUT',
        data
    })
}

export  {
    getMerchantPaymentList as merchantPaymentListApi,
    getMerchantPlatformminiList as merchantPlatformminiListApi,
    getPlatformAlliList as platformAlliListApi,
    addCompanyForm as addCompanyFormApi,
    updateCompanyForm as updateCompanyFormApi,
    getAllPayPlatForm as allPayPlatFormApi
}