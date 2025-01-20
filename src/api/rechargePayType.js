import service from '@/utils/request'

const getRechargePayTypeList = (params)=>{
    return service({
        url: 'admin/mch/rechargePayType/list',
        method: 'get',
        params
    })
}

//更改该支付方式是否支持h5
const updateCompanyPayTypeH5 = (id)=>{
    return service({
        url: `admin/mch/rechargePayType/updatePayTypeH5/${id}`,
        method: 'put'
    })
}

//该企业没有配置的支付方式
const getCompanyPayNotTypeList = (params)=>{
    return service({
        url: 'admin/mch/rechargePayType/getCompanyPayType',
        method: 'get',
        params
    })
}

//为企业添加支付方式
const createRechargePayType = (data)=>{
    return service({
        url: 'admin/mch/rechargePayType/addCompanyPayType',
        method: 'post',
        data
    })
}
//删除这个企业的某个支付方式
const deleteRechargePayTypeByTypeId = (id) =>{
    return service({
        url: `admin/mch/rechargePayType/deleteCompanyPayType/${id}`,
        method: 'put'
    })
}

//删除这个企业所有的支付方式
const deleteRechargePayTypeByCompanyId = (id) =>{
    return service({
        url: `admin/mch/rechargePayType/deleteCompanyAllPayType/${id}`,
        method: 'delete'
    })
}



export  {
    getRechargePayTypeList as getRechargePayTypeListApi,
    updateCompanyPayTypeH5 as updateCompanyPayTypeH5Api,
    getCompanyPayNotTypeList as getCompanyPayNotTypeListApi,
    createRechargePayType as createRechargePayTypeApi,
    deleteRechargePayTypeByTypeId as deleteRechargePayTypeByTypeIdApi,
    deleteRechargePayTypeByCompanyId as deleteRechargePayTypeByCompanyIdApi
}
