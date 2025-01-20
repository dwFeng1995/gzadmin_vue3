const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'blur' },
    ],
    appid: [
        { required: true, message: '请输入appid', trigger: 'blur' },
    ],
    mch_id: [
        { required: true, message: '请输入微信支付MCH_ID', trigger: 'blur' }
    ],
    remark: [
        { required: true, message: '请输入备注', trigger: 'blur' }
    ],
    key: [
        { required: true, message: '请输入微信支付key', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入支付平台商户名称', trigger: 'blur' },
    ]
}

export  default formRules
