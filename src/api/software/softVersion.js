//软件版本
import service from '@/utils/request'

const getSoftVersionList = (params)=>{
    return service({
        url: 'admin/software/version',
        method: 'get',
        params
    })
}

const createSoftVersion = (data)=>{
    return service({
        url: 'admin/software/version',
        method: 'post',
        data
    })
}

const updateSoftVersion = (data, id)=>{
    return service({
        url: `admin/software/version/${id}`,
        method: 'put',
        data
    })
}

const deleteSoftVersion = (id)=>{
    return service({
        url: `admin/software/version/${id}`,
        method: 'delete'
    })
}

export  {
    getSoftVersionList as getSoftVersionListApi,
    createSoftVersion as createSoftVersionApi,
    updateSoftVersion as updateSoftVersionApi,
    deleteSoftVersion as deleteSoftVersionApi
}
