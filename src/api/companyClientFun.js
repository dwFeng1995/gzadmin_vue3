import service from '@/utils/request'

const getCompanyClientFunList = (params)=>{
    return service({
        url: 'admin/company/canteenClientFun',
        method: 'get',
        params
    })
}

const createCompanyClientFun = (data)=>{
    return service({
        url: `admin/company/canteenClientFun`,
        method: 'post',
        data
    })
}

const updateCompanyClientFun = (data, id)=>{
    return service({
        url: `admin/company/canteenClientFun/${id}`,
        method: 'put',
        data
    })
}

const deleteCompanyClientFun = (id)=>{
    return service({
        url: `admin/company/canteenClientFun/${id}`,
        method: 'delete'
    })
}
const companyClientFunDetail = (id)=>{
    return service({
        url: `admin/company/canteenClientFun/${id}`,
        method: 'get'
    })
}

const companyFun = (id)=>{
    return service({
        url: `admin/company/canteenFunctionFun/${id}`,
        method: 'get'
    })
}

const companyFunInfo = (id)=>{
    return service({
        url: `admin/company/canteenFunctionFunInfo/${id}`,
        method: 'get'
    })
}


export {
    getCompanyClientFunList as getCompanyClientFunListApi,
    createCompanyClientFun as createCompanyClientFunApi,
    updateCompanyClientFun as updateCompanyClientFunApi,
    deleteCompanyClientFun as deleteCompanyClientFunApi,
    companyFun as companyFunApi,
    companyFunInfo as companyFunInfoApi,
    companyClientFunDetail as companyClientFunDetailApi
}
