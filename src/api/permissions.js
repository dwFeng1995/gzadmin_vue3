// 用户权限管理下的 用户列表里面的用户权限
import service from '@/utils/request'



//根据用户id获取菜单
const getUserMenu= (params)=>{
    return service({
        url: 'admin/ad/usersMenu',
        method: 'get',
        params
    })
}

//根据用户id修改该用户绑定的菜单
const updateUserMenu = (data, id)=>{
    return service({
        url: `admin/ad/usersMenu/${id}`,
        method: 'put',
        data
    })
}

export  {
    getUserMenu as getUserMenuApi,
    updateUserMenu as updateUserMenuApi
}
