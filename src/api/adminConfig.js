import service from '@/utils/request'

const getAdminConfigList = (params)=>{
    return service({
        url: 'admin/company/config',
        method: 'get',
        params
    })
}

const createAdminConfig = (data)=>{
    return service({
        url: 'admin/company/config',
        method: 'post',
        data
    })
}

const updateAdminConfig = (data, id)=>{
    return service({
        url: `admin/company/config/${id}`,
        method: 'put',
        data
    })
}

const deleteAdminConfig = (id)=>{
    return service({
        url: `admin/company/config/${id}`,
        method: 'delete'
    })
}

const adminConfigDetail = (id)=>{
    return service({
        url: `admin/company/config/${id}`,
        method: 'get'
    })
}
const adminConfigStatus = (id)=>{
    return service({
        url: `admin/company/configUpdateStatus/${id}`,
        method: 'put'
    })
}



export  {
    getAdminConfigList as getAdminConfigListApi,
    createAdminConfig as createAdminConfigListApi,
    updateAdminConfig as updateAdminConfigApi,
    deleteAdminConfig as deleteAdminConfigApi,
    adminConfigDetail as adminConfigDetailApi,
    adminConfigStatus as adminConfigStatusApi
}
