import service from '@/utils/request'

const allClientType = ()=>{
    return service({
        url: 'admin/client/clientType-mini',
        method: 'get'
    })
}

const getClientTypeList = (params)=>{
    return service({
        url: 'admin/client/clientType',
        method: 'get',
        params
    })
}


const updateClientType = (data, id)=>{
    return service({
        url: `admin/client/clientType/${id}`,
        method: 'put',
        data
    })
}

const getClientTypeDetail = (id)=>{
    return service({
        url: `admin/client/clientType/${id}`,
        method: 'get',
    })
}

const createClientType = (data)=>{
    return service({
        url: 'admin/client/clientType',
        method: 'post',
        data
    })
}

const deleteClientType = (id)=>{
    return service({
        url: `admin/client/clientType/${id}`,
        method: 'delete',
    })
}

const updateClientTypeStatus = (id)=>{
    return service({
        url: `admin/client/updateClientTypeStatus/${id}`,
        method: 'put',
    })
}

export  {
    allClientType as allClientTypeApi,
    getClientTypeList as getClientTypeListApi,
    updateClientType as updateClientTypeApi,
    getClientTypeDetail as getClientTypeDetailApi,
    createClientType as createClientTypeApi,
    deleteClientType as deleteClientTypeApi,
    updateClientTypeStatus as updateClientTypeStatusApi
}
