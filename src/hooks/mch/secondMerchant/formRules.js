const formRules = {
    companyId: [
        { required: true, message: '请选择企业', trigger: 'change' },
    ],
    secondName: [
        { required: true, message: '请输入二级商户名', trigger: 'blur' },
    ],
    second_type: [
        { required: true, message: '请选择二级商户类型', trigger: 'change' }
    ],
}

export default formRules
