const formRules = {
    parent_id: [
        { required: true, message: '请选择父级', trigger: 'change' }
    ],
    title: [
        { required: true, message: '请选择菜单标题', trigger: 'change' },
    ],
    permission: [
        { required: true, message: '请选择权限', trigger: 'blur' }
    ],
    order: [
        {required: true, message: '请输入排序', trigger: 'blur' },
        { type: 'number', message: '排序只能是数字' }
    ],
    uri: [
        { required: true, message: '请输入vue路由相对路径', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入vue-route name', trigger: 'blur' }
    ],
    redirect: [
        // { required: true, message: '请输入vue路由重定向地址', trigger: 'blur' }
    ]

}

export  default formRules
