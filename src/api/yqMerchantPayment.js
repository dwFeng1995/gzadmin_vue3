import service from '@/utils/request'

const getYqPaymentList = (params)=>{
    return service({
        url: 'admin/mch/company-one',
        method: 'get',
        params
    })
}

//更新一清商户
const updateYqForm = (data,id)=>{
    return service({
        url: `admin/mch/company/${id}`,
        method: 'PUT',
        data
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

//获取企业部门列表
const getUserDepartList = (params)=>{
    return service({
        url: 'admin/company/user-depart/list',
        method: 'get',
        params
    })
}

//获取企业用户组列表
const getUserGroupList = (params)=>{
    return service({
        url: 'admin/company/user-group/list',
        method: 'get',
        params
    })
}

//获取食堂列表列表
const getCanteenMiniList = (params)=>{
    return service({
        url: 'admin/company/canteen-mini',
        method: 'get',
        params
    })
}

//获取所有设备列表不分页
const getClientMiniList = (params) =>{
    return service({
        url: 'admin/client/mini-list',
        method: 'get',
        params
    })
}

export  {
    getYqPaymentList as yqPaymentListApi,
    updateYqForm as updateYqFormApi,
    getPlatformAlliList as platformAlliListApi,
    getUserDepartList as userDepartListApi,
    getUserGroupList as userGroupListApi,
    getCanteenMiniList as canteenMiniListApi,
    getClientMiniList as clientMiniListApi
}