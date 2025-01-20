const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'blur' },
    ],
    appid: [
        { required: true, message: '请输入缴费编号', trigger: 'blur' },
    ],
    item_code: [
        { required: true, message: '请输入支付项', trigger: 'blur' },
    ],
    name: [
        { required: true, message: '请输入支付平台商户名称', trigger: 'blur' },
    ],
    aes_iv: [
        { required: true, message: '请输入aes_iv', trigger: 'blur' },
    ]
}

export default formRules
