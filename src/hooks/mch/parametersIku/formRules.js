const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'blur' },
    ],
    appid: [
        { required: true, message: '请输入缴费中心', trigger: 'blur' },
    ],
    remark: [
        { required: true, message: '请输入备注', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入支付平台商户名称', trigger: 'blur' },
    ]
}

export  default  formRules
