import service from '@/utils/request'

const getClientWeighList = (params)=>{
    return service({
        url: 'admin/client/clientWeigh',
        method: 'get',
        params
    })
}

const updateClientWeighStatus = (id)=>{
    return service({
        url: `admin/client/updateClientWeighStatus/${id}`,
        method: 'put'
    })
}

const createClientWeigh = (data)=>{
    return service({
        url: 'admin/client/clientWeigh',
        method: 'post',
        data
    })
}
const updateClientWeigh = (data, id)=>{
    return service({
        url: `admin/client/clientWeigh/${id}`,
        method: 'put',
        data
    })
}

const getClientWeighDetail = (id)=>{
    return service({
        url: `admin/client/clientWeigh/${id}`,
        method: 'get'
    })
}

const deleteClientWeigh = (id)=>{
    return service({
        url: `admin/client/clientWeigh/${id}`,
        method: 'delete'
    })
}

export  {
    getClientWeighList as getClientWeighListApi,
    updateClientWeighStatus as updateClientWeighStatusApi,
    createClientWeigh as createClientWeighApi,
    updateClientWeigh as updateClientWeighApi,
    getClientWeighDetail as getClientWeighDetailApi,
    deleteClientWeigh as deleteClientWeighApi
}
