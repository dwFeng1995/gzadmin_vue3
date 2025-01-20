import service from '@/utils/request'

const clientFunctionInfoAll = ()=> {
    return service({
        url: 'admin/client/clientFunctionInfo-mini',
        method: 'get',
    })
}

const getClientFunctionInfoList = (params)=> {
    return service({
        url: 'admin/client/clientFunctionInfo',
        method: 'get',
        params
    })
}

const createClientFunctionInfo = (data)=> {
    return service({
        url: 'admin/client/clientFunctionInfo',
        method: 'post',
        data
    })
}

const updateClientFunctionInfo = (data, id)=> {
    return service({
        url: `admin/client/clientFunctionInfo/${id}`,
        method: 'put',
        data
    })
}

const deleteClientFunctionInfo = (id)=> {
    return service({
        url: `admin/client/clientFunctionInfo/${id}`,
        method: 'delete'
    })
}


const getClientFunctionInfoDetail = (id)=> {
    return service({
        url: `admin/client/clientFunctionInfo/${id}`,
        method: 'get'
    })
}

export  {
    clientFunctionInfoAll as clientFunctionInfoAllApi,
    getClientFunctionInfoList as getClientFunctionInfoListApi,
    createClientFunctionInfo as createClientFunctionInfoApi,
    updateClientFunctionInfo as updateClientFunctionInfoApi,
    deleteClientFunctionInfo as deleteClientFunctionInfoApi,
    getClientFunctionInfoDetail as getClientFunctionInfoDetailApi
}
