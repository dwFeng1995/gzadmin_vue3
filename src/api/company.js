import service from '@/utils/request'
const companyList = (params) => {
    return service({
        url: 'admin/company/company',
        method: 'get',
        params
    })
}

const createCompany = (data) => {
    return service({
        url: 'admin/company/company',
        method: 'post',
        data
    })
}

const updateCompany = (id, data) => {
    return service({
        url: `admin/company/company/${id}`,
        method: 'put',
        data
    })
}

const companyFunction = () => {
    return service({
        url: 'admin/company/company-function',
        method: 'get'
    })
}
const companyDetail = (id) => {
    return service({
        url: `admin/company/company/${id}`,
        method: 'get'
    })
}

const companyMiniList = () => {
    return service({
        url: 'admin/company/company-mini',
        method: 'get'
    })
}
const secondList = (params) => {
    return service({
        url: 'admin/mch/sub',
        method: 'get',
        params
    })
}

const platformList = (params) => {
    return service({
        url: 'admin/mch/company-platFrom',
        method: 'get',
        params
    })
}

const facilityList = (params) => {
    return service({
        url: 'admin/client/mini-list',
        method: 'get',
        params
    })
}



const createNewCommercial = (data) => {
    return service({
        url: 'admin/mch/sub',
        method: 'post',
        data
    })
}

const updateCommercial = (data, id) => {
    return service({
        url: `admin/mch/sub/${id}`,
        method: 'put',
        data
    })
}
const thirdPartyList = (params) => {
    return service({
        url: 'admin/mch/thirdParty/info',
        method: 'get',
        params
    })
}

export {
    companyList as companyListApi,
    companyFunction as companyFunctionApi,
    createCompany as createCompanyApi,
    companyDetail as companyDetailApi,
    updateCompany as updateCompanyApi,
    companyMiniList as companyMiniListApi,
    secondList as secondListApi,
    platformList as platformListApi,
    createNewCommercial as createNewCommercialApi,
    facilityList as facilityListApi,
    updateCommercial as updateCommercialApi,
    thirdPartyList as thirdPartyListApi
}
