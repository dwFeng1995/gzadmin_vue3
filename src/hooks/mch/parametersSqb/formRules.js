const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'change' },
    ],
    appid: [
        { required: true, message: '请输入appid', trigger: 'blur' },
    ],
    remark: [
        { required: true, message: '请输入备注', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入支付平台商户名称', trigger: 'blur' },
    ],
    vendor_key: [
        { required: true, message: '请输入服务商密钥', trigger: 'blur' },
    ],
    vendor_sn: [
        { required: true, message: '请输入服务商序列号', trigger: 'blur' },
    ]
}

export  default  formRules
