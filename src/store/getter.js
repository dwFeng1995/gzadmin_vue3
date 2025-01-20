const  getters = {

    //获取token
    getToken: state => {
        return state.token
    },
    //获取管理员 用户名
    getAdminName: state=> {
        return state.adminName
    },

    //获取菜单
    getMenuList: state=>{
        return state.menuList
    }
}
export default getters
