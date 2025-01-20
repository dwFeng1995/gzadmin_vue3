import service from '@/utils/request'

const getCompanyPayTypeList = (params)=>{
    return service({
        url: 'admin/mch/companyPayType',
        method: 'get',
        params
    })
}

const getCompanyPayTypeDetail = (id)=>{
    return service({
        url: `admin/mch/companyPayType/${id}`,
        method: 'get'
    })
}

const updateCompanyPayType = (data)=>{
    return service({
        url: `admin/mch/companyPayType`,
        method: 'post',
        data
    })
}

export  {
    getCompanyPayTypeList as getCompanyPayTypeListApi,
    getCompanyPayTypeDetail as getCompanyPayTypeDetailApi,
    updateCompanyPayType as updateCompanyPayTypeApi
}
