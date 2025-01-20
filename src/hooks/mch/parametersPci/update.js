import {onMounted, reactive, toRefs, ref, watch} from "vue"
import {ElMessage} from "element-plus"
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
    name: '',
    company_id: '',
    appid: '',
    item_code: '',
    private_key_path: '',
    public_key_path: '',
    remark: '',
    aes_iv: '',
    aes_key: ''
})
const getCompanyMiniList = async ()=>{ 
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    state.fileList = []
    formRef.value.resetFields()
}

watch(()=>formParams.company_id, (newVal, oldVal)=>{
    const company = state.companyMiniList.find(x=>x.id === newVal)
    if(company !== undefined) {
        formParams.remark = `${company.company_name}佳都缴费中心`
    }
    console.log(newVal, oldVal)
})

const initDetail = async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.company_id = props?.detail?.company_id
    formParams.appid = props?.detail?. appid
    formParams.name = props?.detail?.name
    formParams.item_code = props?.detail?.item_code
    formParams.private_key_path = props?.detail?.private_key_path
    formParams.public_key_path = props?.detail?.public_key_path
    formParams.remark = props?.detail?.remark
    formParams.aes_iv = props?.detail?.aes_iv
    formParams.aes_key = props?.detail?.aes_key
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
                pay_type_code: 'PCI',
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
    main,
    formRef,
    formParams

}
