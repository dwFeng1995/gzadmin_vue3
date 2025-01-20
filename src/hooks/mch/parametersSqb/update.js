import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import  {companyMiniListApi} from '@/api/company'
import  {updateMchPlatformApi, sqbActivationApi} from  '@/api/paymentPlatform'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const activateFormRef = ref(null)

const state = reactive({
    companyMiniList: [],
    activateDialogVisible: false
})
const newState = toRefs(state)

const formParams = reactive({
    id: '',
    company_id: '',
    appid: '',
    name: '',
    remark: '',
    vendor_key: '',
    vendor_sn: '',
    terminal_key: '',
    terminal_sn: '',
    has_activate: false,
    checkin_at: ''
})

//收钱吧激活
const activateFormParams = reactive({
    code: ''
})

const activateFormRules = {
    code: [
        { required: true, message: '请输入激活码', trigger: 'blur' }
    ]
}

//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    formRef.value.resetFields()
}
const activateDialogClosed = ()=>{
    activateFormRef.value.resetFields()
}

const initDetail =  async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.name = props?.detail?.name
    formParams.company_id = props?.detail?. company_id
    formParams.appid = props?.detail?. appid
    formParams.remark = props?.detail?.remark
    formParams.checkin_at = props?.detail?.checkin_at
    formParams.has_activate = props?.detail?.has_activate
    formParams.terminal_sn = props?.detail?.terminal_sn
    formParams.terminal_key = props?.detail?.terminal_key
    formParams.vendor_key = props?.detail?.vendor_key
    formParams.vendor_sn = props?.detail?.vendor_sn
}

//处理收钱吧激活
const activateHandel = ()=>{
    activateFormRef.value.validate(async valid=>{
        if(!valid) {
            return
        }
        const res = await sqbActivationApi({
            code: activateFormParams.code,
            mch_id: formParams.id
        })
        if(res>= 0 || res === true) {
            ElMessage.success({
                message: '激活成功',
                showClose: true
            })
            formParams.has_activate = 1
            state.activateDialogVisible = false
        }
    })
}

const main = (props, emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            formData.checkin_at = undefined
            formData.has_activate = undefined
            formData.terminal_sn = undefined
            formData.terminal_key = undefined
            const res = await updateMchPlatformApi({
                pay_type_code: 'SQB',
                company_id: formParams.company_id,
                ...formData
            }, formParams.id)
            if(res>= 0 || res === true) {
                ElMessage.success({
                    message: '更新成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log('emit', emit)
    }
    onMounted(()=>{
        initDetail(props)
    })
    return {
        ...newState,
        resterForm,
        submitForm,
        activateDialogClosed,
        activateHandel
    }
}

export  {
    formRef,
    formParams,
    main,
    activateFormParams,
    activateFormRef,
    activateFormRules
}



