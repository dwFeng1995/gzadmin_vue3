const formRules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    slug: [
        { required: true, message: '请输入标识', trigger: 'blur' }
    ]
}

export  default formRules
