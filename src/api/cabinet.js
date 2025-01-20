import service from '@/utils/request'

const getCabinetList = (params)=>{
    return service({
        url: 'admin/client/cabinet',
        method: 'get',
        params
    })
}

const updateCabinetStatus = (id)=>{
    return service({
        url: `admin/client/updateCabinetStatus/${id}`,
        method: 'put'
    })
}

const createCabinet = (data)=>{
    return service({
        url: 'admin/client/cabinet',
        method: 'post',
        data
    })
}
const updateCabinet = (data, id)=>{
    return service({
        url: `admin/client/cabinet/${id}`,
        method: 'put',
        data
    })
}

const getCabinetDetail = (id)=>{
    return service({
        url: `admin/client/cabinet/${id}`,
        method: 'get'
    })
}

const deleteCabinet = (id)=>{
    return service({
        url: `admin/client/cabinet/${id}`,
        method: 'delete'
    })
}

export  {
    getCabinetList as getCabinetListApi,
    updateCabinetStatus as updateCabinetStatusApi,
    createCabinet as createCabinetApi,
    updateCabinet as updateCabinetApi,
    getCabinetDetail as getCabinetDetailApi,
    deleteCabinet as deleteCabinetApi
}
