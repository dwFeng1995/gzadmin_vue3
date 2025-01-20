//设备软件版本
import service from '@/utils/request'

const getClintSoftVersionList = (params)=>{
    return service({
        url: 'admin/software/client',
        method: 'get',
        params
    })
}

const updateClintSoftVersion = (data, id)=>{
    return service({
        url: `admin/software/client/${id}`,
        method: 'put',
        data
    })
}

const deleteClintSoftVersion = (id)=>{
    return service({
        url: `admin/software/client/${id}`,
        method: 'delete'
    })
}

export  {
    getClintSoftVersionList as getClintSoftVersionListApi,
    updateClintSoftVersion as updateClintSoftVersionApi,
    deleteClintSoftVersion as deleteClintSoftVersionApi
}
