const formRules = {
    code: [
        { required: true, message: '请输入系统名称', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    model: [
        { required: true, message: '请输入模型文件', trigger: 'blur' }
    ]
}

export  default  formRules
