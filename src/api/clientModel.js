import service from '@/utils/request'

const getClientModelMiniList = (params)=>{
    return service({
        url: 'admin/client/clientModel-mini',
        method: 'get',
        params
    })
}


const getClientModelList = (params)=>{
    return service({
        url: 'admin/client/clientModel',
        method: 'get',
        params
    })
}

const createClientModel = (data)=>{
    return service({
        url: 'admin/client/clientModel',
        method: 'post',
        data
    })
}

const updateClientModel = (data, id)=>{
    return service({
        url: `admin/client/clientModel/${id}`,
        method: 'put',
        data
    })
}

const deleteClientModel = (id)=>{
    return service({
        url: `admin/client/clientModel/${id}`,
        method: 'delete'
    })
}

const getClientModelDetail = (id)=>{
    return service({
        url: `admin/client/clientModel/${id}`,
        method: 'get'
    })
}

export  {
    getClientModelMiniList as getClientModelMiniListApi,
    getClientModelList as getClientModelListApi,
    createClientModel as createClientModelApi,
    updateClientModel as updateClientModelApi,
    deleteClientModel as deleteClientModelApi,
    getClientModelDetail as getClientModelDetailApi

}
