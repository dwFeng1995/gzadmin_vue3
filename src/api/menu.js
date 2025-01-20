//菜单列表
import service from '@/utils/request'

const getMenuList = (params)=>{
    return service({
        url: 'admin/ad/menu',
        method: 'get',
        params
    })
}

const deleteMenu = (id)=>{
    return service({
        url: `admin/ad/menu/${id}`,
        method: 'delete'
    })
}

const createMenu = (data)=>{
    return service({
        url: `admin/ad/menu`,
        method: 'post',
        data
    })
}

const updateMenu = (data, id)=>{
    return service({
        url: `admin/ad/menu/${id}`,
        method: 'put',
        data
    })
}

export  {
    getMenuList as getMenuListApi,
    deleteMenu as deleteMenuApi,
    createMenu as createMenuApi,
    updateMenu as updateMenuApi
}
