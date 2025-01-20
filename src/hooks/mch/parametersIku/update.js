import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import  {companyMiniListApi} from '@/api/company'
import  {updateMchPlatformApi} from  '@/api/paymentPlatform'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)

const state = reactive({
    companyMiniList: []
})
const newState = toRefs(state)

const formParams = reactive({
    id: '',
    company_id: '',
    appid: '',
    name: '',
    mch_id: '',
    remark: '',
    secret_key: '',
    shop_id: '',
    device_id: '',
    operator_id: '',
    redirect_url: '',
    mch_sub_id: ''
})



//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    formRef.value.resetFields()
}

const initDetail =  async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.name = props?.detail?.name
    formParams.company_id = props?.detail?. company_id
    formParams.appid = props?.detail?. appid
    formParams.mch_id =  props?.detail?. mch_id
    formParams.remark = props?.detail?.remark
    formParams.secret_key = props?.detail?.secret_key
    formParams.shop_id = props?.detail?.shop_id
    formParams.device_id = props?.detail?.device_id
    formParams.operator_id = props?.detail?.operator_id
    formParams.redirect_url = props?.detail?.redirect_url
    formParams.mch_sub_id = props?.detail?.mch_sub_id

}

const main = (props, emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateMchPlatformApi({
                pay_type_code: 'IKU',
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
        submitForm
    }
}

export  {
    formRef,
    formParams,
    main
}



