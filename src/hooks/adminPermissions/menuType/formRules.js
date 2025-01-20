const formRules = {
    menu_type_name: [
        { required: true, message: '请输入菜单标题', trigger: 'blur' }
    ],
    sort: [
        { required: true, message: '请输入排序', trigger: 'blur' },
        { type: 'number', message: '排序只能是数字' }
    ]
}

export  default formRules
