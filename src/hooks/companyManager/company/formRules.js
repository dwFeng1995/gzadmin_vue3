const  formRules = {
    company_name: [
        { required: true, message: '请输入企业名称', trigger: 'blur' }
    ],
        company_no: [
        { required: true, message: '请输入企业号', trigger: 'blur' },
        { min: 5, max: 5, message: '企业号只能是五位数字', trigger: 'blur' }
    ],
        pay_system_id: [
        { required: true, message: '请选择支付系统', trigger: 'change' }
    ],
        admin_user_id: [
        { required: true, message: '请选择企业用户', trigger: 'change' }
    ],
        diy_canteen: {
        data: [
            { required: true, message: '请输入数量', trigger: 'blur' },
            { pattern: /(^[1-9]\d*$)/, message: '请输入正整数', trigger: 'blur' }
        ]
    },
    client_pay_system: [
        { required: true, message: '请输入设备支付综合收银台', trigger: 'blur' }
    ],
        import_nutriment_status: [
        { required: true, message: '请选择营养状态', trigger: 'blur' }

    ],
    password: [
        { required: true, message: '请输入提现密码', trigger: 'blur' },
        { min: 6, max: 15, message: '提现密码6~15位', trigger: 'blur' }
    ]

}


export default formRules