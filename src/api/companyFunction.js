import service from '@/utils/request'
const companyFunctionList = (params)=>{
   return service({
        url: 'admin/company/function',
        method: 'get',
        params
    })
}

const createCompanyFunction = (data)=>{
    return service({
        url: 'admin/company/function',
        method: 'post',
        data
    })
}

const updateCompanyFunction = (id, data)=>{
    return service({
        url: `admin/company/function/${id}`,
        method: 'put',
        data
    })
}

const deleteCompanyFunction = (id)=>{
    return service({
        url: `admin/company/function/${id}`,
        method: 'delete'
    })
}

export {
    companyFunctionList as companyFunctionListApi,
    createCompanyFunction as createCompanyFunctionApi,
    updateCompanyFunction as updateCompanyFunctionApi,
    deleteCompanyFunction as deleteCompanyFunctionApi
}
