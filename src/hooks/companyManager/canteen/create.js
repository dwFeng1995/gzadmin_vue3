import  {lineOrderStatusApi} from '@/api/canteen'
import  {allPaySystemApi} from '@/api/paySystem'
import  {companyMiniListApi} from '@/api/company'
import  {createCanteenApi} from '@/api/canteen'
import {companyFunctionApi } from '@/api/company'
import {reactive, onMounted, toRefs, ref} from 'vue'
import  {deepCopy} from '@/utils/object'
import {ElMessage} from "element-plus"

const formRef = ref(null)

const checkTime = (rule, value, callback)=>{
    if(!value) {
        callback(new Error('开始时间不能为空'))
    }
    if(value &&  state.formParams.endTime) {
        if(value >= state.formParams.endTime) {
            callback(new Error('开始时间必须大于结束时间'))
        }else {
            callback()
        }
    }
}
const formRules = {
    canteen_no: [
        { required: true, message: '食堂编号不能为空', trigger: 'blur' },
        { pattern: /(^[0-9]\d*$)/, message: '只能输入数字', trigger: 'blur' }
    ],
    company_id: [
        { required: true, message: '请选择企业', trigger: 'blur' }
    ],
    canteen_name: [
        { required: true, message: '食堂名称不能为空', trigger: 'blur' }
    ],
    canteen_address: [
        { required: true, message: '食堂地址不能为空', trigger: 'blur' }
    ],
    startTime: [
        { required: true, message: '开始时间不能为空', trigger: 'blur' },
        { validator: checkTime, trigger: 'blur' }
    ],
    endTime: [
        { required: true, message: '结束时间不能为空', trigger: 'blur' }
    ]
}
const state = reactive({
    formParams: {
        canteen_no: '',
        company_id: '',
        canteen_name: '',
        canteen_address: '',
        canteen_phone: '',
        appid: '',
        secret_key: '',
        remark: '',
        pay_system_ip: '',
        pay_system: [],
        face_system: [],
        place_status: 1,
        verity_status:0,
        startTime: '',
        endTime: '',
        password: ''
    },
    companyMiniList: [],
    paySystemList: [],
    faceSystemList: [],
    lineOrderStatus: []
})
const  main =()=>{
    const getCompanyMiniList = async ()=>{
        const res = await companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const getPaySystemList =  async ()=>{
       const res = await  allPaySystemApi()
        state.paySystemList = res ?? []
    }
    const getLineOrderStatus =  async()=>{
       const res = await lineOrderStatusApi()
        state.lineOrderStatus = res ??[]
    }
    //企业功能
    const getCompanyFunction = async ()=>{
        const res = await companyFunctionApi()
        state.faceSystemList =res?.face_system
    }
    const  submit = (emit)=>{
        console.log('emit',emit)
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(state.formParams)
            formData.opening_hours  =  `${formData.startTime}~${formData.endTime}`
            formData.startTime = undefined
            formData.endTime = undefined
            //提交数据
            const res  = await createCanteenApi(formData)
            if(res === true) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
    }
    const resetForm = ()=>{
        formRef.value.resetFields()
    }
    onMounted(()=>{
        getCompanyFunction()
        getCompanyMiniList()
        getPaySystemList()
        getLineOrderStatus()
    })

    const newState = toRefs(state)
    return {
        ...newState,
        submit,
        resetForm
    }
}

export  {
    main,
    formRef,
    formRules
}
