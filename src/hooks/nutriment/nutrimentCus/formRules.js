import  {priceReg} from  '@/utils/regEx'

const formRules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    energy: [
        { required: true, message: '请输入热量', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    protein: [
        { required: true, message: '请输入蛋白质', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    fat: [
        { required: true, message: '请输入脂肪', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    carbohydrate: [
        { required: true, message: '请输入碳水化合物', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    dietary_fiber: [
        { required: true, message: '请输入膳食纤维', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    calcium: [
        { required: true, message: '请输入钙', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    iron: [
        { required: true, message: '请输入铁', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    zinc: [
        { required: true, message: '请输入锌', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    selenium: [
        { required: true, message: '请输入硒', trigger: 'blur' },
        { pattern: priceReg, message: '请输入整数或者小数(大于等于0)', trigger: 'blur' }
    ],
    company_id: [
        { required: true, message: '请选择企业', trigger: 'change' }
    ]
}


export  default  formRules
