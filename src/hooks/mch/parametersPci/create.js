import {onMounted, reactive, toRefs, ref, watch} from "vue"
import {ElMessage} from "element-plus"
import  {companyMiniListApi} from '@/api/company'
import  {createMchPlatformApi, getPlatformDefaultApi} from  '@/api/paymentPlatform'

const formRef = ref(null)
const state = reactive({
    companyMiniList: []
})
const newState = toRefs(state)

const formParams = reactive({
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

const  getPlatformDefault = async ()=>{
    const res =  await getPlatformDefaultApi({pay_type_code: 'PCI'})
    if(Object.keys(res ?? {}).length > 0) {
        for(let key in formParams) {
            for (let item in res) {
                if(key === item) {
                    formParams[key] = res[item]
                }
            }
        }
    }
}
const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createMchPlatformApi({
                pay_type_code: 'PCI',
                company_id: formParams.company_id,
                data: [formParams]
            })
            if(res> 0 || res === true) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log('emit', emit)
    }
    onMounted(()=>{
        getCompanyMiniList()
        getPlatformDefault()
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
