const formRules = {
    parent_id: [
        { required: true, message: '请选择父级', trigger: 'change' }
    ],
    title: [
        { required: true, message: '请输入菜单标题', trigger: 'blur' }
    ],
    order: [
        { required: true, message: '请输入排序', trigger: 'blur' },
        { type: 'number', message: '排序只能是数字' }
    ],
    uri: [
        { required: true, message: '请输入前端路由路径', trigger: 'blur' },
    ],
    route_name: [
        { required: true, message: '请输入Vue路由name', trigger: 'blur' },
    ]

}

export  default formRules
