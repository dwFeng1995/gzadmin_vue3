import service from '@/utils/request'
//删除用户组数据
const deleteUserGroupList = (params) => {
    return service({
        url: 'admin/company/user-group/delete',
        method: 'get',
        params
    })
}

//删除部门数据
const deleteUserDepartList = (params) => {
    return service({
        url: 'admin/company/user-depart/delete',
        method: 'get',
        params
    })
}

export {
    deleteUserGroupList as deleteUserGroupListApi,
    deleteUserDepartList as deleteUserDepartListApi
}