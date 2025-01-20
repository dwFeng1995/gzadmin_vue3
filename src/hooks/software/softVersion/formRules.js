const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'change' },
    ],
    version: [
        { required: true, message: '请输入版本号', trigger: 'blur' },
    ],
    client_type_code: [
        { required: true, message: '请选择设备类型', trigger: 'change' },
    ],
    status: [
        { required: true, message: '请选择设版本状态', trigger: 'change' },
    ],
    download_url: [
        { required: true, message: '请上传文件', trigger: 'blur' },
    ]
}

export  default  formRules
