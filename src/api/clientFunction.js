import service from '@/utils/request'

const getClientFunctionMiniList = ()=>{
    return service({
        url: 'admin/client/clientFunction-mini',
        method: 'get'
    })
}

const getClientFunctionList = (params)=>{
    return service({
        url: 'admin/client/clientFunction',
        method: 'get',
        params
    })
}

const createClientFunction = (data)=>{
    return service({
        url: 'admin/client/clientFunction',
        method: 'post',
        data
    })
}

const updateClientFunction = (data, id)=>{
    return service({
        url: `admin/client/clientFunction/${id}`,
        method: 'put',
        data
    })
}

const deleteClientFunction = (id)=>{
    return service({
        url: `admin/client/clientFunction/${id}`,
        method: 'delete'
    })
}

const getClientFunctionDetail = (id)=>{
    return service({
        url: `admin/client/clientFunction/${id}`,
        method: 'get'
    })
}

export  {
    getClientFunctionList as getClientFunctionListApi,
    createClientFunction as createClientFunctionaApi,
    updateClientFunction as updateClientFunctionApi,
    deleteClientFunction as deleteClientFunctionApi,
    getClientFunctionDetail as getClientFunctionDetailApi,
    getClientFunctionMiniList as getClientFunctionMiniListApi

}
