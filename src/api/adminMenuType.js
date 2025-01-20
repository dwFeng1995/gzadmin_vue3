//管理后台分类菜单
import service from '@/utils/request'

const getAdminMenuTypeList = (params)=>{
    return service({
        url: 'admin/menuType',
        method: 'get',
        params
    })
}


const createAdminMenuType = (data)=>{
    return service({
        url: 'admin/menuType',
        method: 'post',
        data
    })
}


const updateAdminMenuType = (data, id)=>{
    return service({
        url: `admin/menuType/${id}`,
        method: 'put',
        data
    })
}

const deleteAdminMenuType = (id)=>{
    return service({
        url: `admin/menuType/${id}`,
        method: 'delete'
    })
}



export  {
    getAdminMenuTypeList as getAdminMenuTypeListApi,
    createAdminMenuType as createAdminMenuTypeApi,
    updateAdminMenuType as updateAdminMenuTypeApi,
    deleteAdminMenuType as deleteAdminMenuTypeApi
}
