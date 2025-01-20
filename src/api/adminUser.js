import service from '@/utils/request'
const adminUserList = (params)=>{
    return service({
        url: 'admin/company/adminuser',
        method: 'get',
        params
    })
}

const createUserAdmin = (data)=>{
    return service({
        url: 'admin/company/adminuser',
        method: 'post',
        data
    })
}
const updateUserAdmin = (id, data)=>{
    return service({
        url: `admin/company/adminuser/${id}`,
        method: 'put',
        data
    })
}

const deleteUserAdmin = (id)=>{
    return service({
        url: `admin/company/adminuser/${id}`,
        method: 'delete',
    })
}

const changeUserStatus = (id)=>{
    return service({
        url: `admin/company/updateAdminUserStatus/${id}`,
        method: 'put',
    })
}

const allAdminUser = ()=>{
    return service({
        url: 'admin/company/adminuserMini',
        method: 'get',
    })
}



export  {
    adminUserList as adminUserListApi,
    createUserAdmin as createUserAdminApi,
    updateUserAdmin as updateUserAdminApi,
    deleteUserAdmin as deleteUserAdminApi,
    changeUserStatus as changeUserStatusApi,
    allAdminUser as allAdminUserApi
}
