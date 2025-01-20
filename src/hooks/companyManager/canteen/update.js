import  {lineOrderStatusApi} from '@/api/canteen'
import  {allPaySystemApi} from '@/api/paySystem'
import  {companyMiniListApi} from '@/api/company'
import  {updateCanteenApi} from '@/api/canteen'
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
    primaryId: null,    //主键id
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
        verity_status: 0,
        place_status: 1,
        startTime: '',
        endTime: '',
        password: ''
    },
    companyMiniList: [],
    paySystemList: [],
    faceSystemList: [],
    lineOrderStatus: []
})
const  main =(props)=>{
    console.log('props',props)
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
            formData.canteen_no = undefined
            formData.opening_hours  =  `${formData.startTime}~${formData.endTime}`
            formData.startTime = undefined
            formData.endTime = undefined
            //提交数据
            const res  = await updateCanteenApi(formData, state.primaryId)
            if(res === true) {
                ElMessage.success({
                    message: '更新成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
    }
    const resetForm = ()=>{
        state.primaryId = null
        formRef.value.resetFields()
    }
    const initDetail = ()=>{
        state.primaryId = props?.detail?.canteen?.id
        state.formParams.canteen_no = props?.detail?.canteen?.canteen_no
        state.formParams.company_id = props?.detail?.canteen?.company_id
        state.formParams.canteen_name = props?.detail?.canteen?.canteen_name
        state.formParams.canteen_address = props?.detail?.canteen?.canteen_address
        state.formParams.canteen_phone = props?.detail?.canteen?.canteen_phone
        state.formParams.appid = props?.detail?.canteen?.appid
        state.formParams.secret_key = props?.detail?.canteen?.secret_key
        state.formParams.remark = props?.detail?.canteen?.remark
        state.formParams.pay_system_ip = props?.detail?.canteen?.pay_system_ip
        state.formParams.place_status = props?.detail?.canteen?.place_status
        state.formParams.verity_status = props?.detail?.canteen?.verity_status
        state.formParams.pay_system = props?.detail?.pay_system.map(item=>item.pay_type_id)
        state.formParams.face_system = props?.detail?.face_system.map(item=>item.face_system_id)
        const timeArr = props?.detail?.canteen?.opening_hours.split('~')
        state.formParams.startTime = timeArr[0] ?? ''
        state.formParams.endTime = timeArr[1] ?? ''
        state.formParams.password = props?.detail?.canteen?.password
    }
    onMounted(()=>{
        getCompanyFunction()
        getCompanyMiniList()
        getPaySystemList()
        getLineOrderStatus()
        initDetail()
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
