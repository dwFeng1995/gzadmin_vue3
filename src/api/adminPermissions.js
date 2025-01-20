//企业权限管理
import service from '@/utils/request'

const getAdminPermissionsList = (params)=>{
    return service({
        url: 'admin/permissions',
        method: 'get',
        params
    })
}


const createAdminPermissions = (data)=>{
    return service({
        url: 'admin/permissions',
        method: 'post',
        data
    })
}


const updateAdminPermissions = (data, id)=>{
    return service({
        url: `admin/permissions/${id}`,
        method: 'put',
        data
    })
}

const deleteAdminPermissions = (id)=>{
    return service({
        url: `admin/permissions/${id}`,
        method: 'delete'
    })
}

export  {
    getAdminPermissionsList as getAdminPermissionsListApi,
    createAdminPermissions as createAdminPermissionsApi,
    updateAdminPermissions as updateAdminPermissionsApi,
    deleteAdminPermissions as deleteAdminPermissionsApi
}
