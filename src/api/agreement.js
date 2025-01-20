import service from '@/utils/request'

const getAgreementList = (params)=> {
    return service({
        url: 'admin/agreement',
        method: 'get',
        params
    })
}

const createAgreement = (data)=> {
    return service({
        url: 'admin/agreement',
        method: 'post',
        data
    })
}

const updateAgreement = (data, id)=> {
    return service({
        url: `admin/agreement/${id}`,
        method: 'put',
        data
    })
}

const deleteAgreement = (id)=> {
    return service({
        url: `admin/agreement/${id}`,
        method: 'delete'
    })
}


const getAgreementDetail = (id)=> {
    return service({
        url: `admin/agreement/${id}`,
        method: 'get'
    })
}

export  {
    getAgreementList as getAgreementListApi,
    createAgreement as createAgreementApi,
    updateAgreement as updateAgreementApi,
    deleteAgreement as deleteAgreementApi,
    getAgreementDetail as getAgreementDetailApi
}
