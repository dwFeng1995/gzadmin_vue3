import service from '@/utils/request'

//登录
const login = (data)=>{
    return service({
        url: 'admin/user/login',
        method: 'post',
        data
    })
}

//用户列表
const getUserList = (params)=>{
    return service({
        url: 'admin/ad/user',
        method: 'get',
        params
    })
}

const deleteUser = (id)=>{
    return service({
        url: `admin/ad/user/${id}`,
        method: 'delete'
    })
}

//添加
const createUser = (data)=>{
    return service({
        url: 'admin/ad/user',
        method: 'post',
        data
    })
}
//更新
const updateUser = (data, id)=>{
    return service({
        url: `admin/ad/user/${id}`,
        method: 'put',
        data
    })
}


export {
    login as loginApi,
    getUserList as getUserListApi,
    deleteUser as deleteUserApi,
    createUser as createUserApi,
    updateUser as updateUserApi
}
