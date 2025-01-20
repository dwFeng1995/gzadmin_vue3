//企业菜单管理
import service from '@/utils/request'

const getAdminMenuList = (params)=>{
    return service({
        url: 'admin/menu',
        method: 'get',
        params
    })
}


const createAdminMenu = (data)=>{
    return service({
        url: 'admin/menu',
        method: 'post',
        data
    })
}


const updateAdminMenu = (data, id)=>{
    return service({
        url: `admin/menu/${id}`,
        method: 'put',
        data
    })
}

const deleteAdminMenu = (id)=>{
    return service({
        url: `admin/menu/${id}`,
        method: 'delete'
    })
}

const getAdminMenuDetail = (params)=>{
    return service({
        url: 'admin/menu/detail',
        method: 'get',
        params
    })
}

export  {
    getAdminMenuList as getAdminMenuListApi,
    createAdminMenu as createAdminMenuApi,
    updateAdminMenu as updateAdminMenuApi,
    deleteAdminMenu as deleteAdminMenuApi,
    getAdminMenuDetail as getAdminMenuDetailApi
}
