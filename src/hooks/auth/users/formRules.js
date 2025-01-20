const formRules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

export  default formRules
