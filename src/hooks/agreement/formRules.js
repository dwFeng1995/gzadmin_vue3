const formRules = {
    code: [
        { required: true, message: '请输入代号', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ]
}

export  default  formRules
