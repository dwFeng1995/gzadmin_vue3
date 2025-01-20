import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import  {companyMiniListApi} from '@/api/company'
import  {createMchPlatformApi} from  '@/api/paymentPlatform'


const formRef = ref(null)

const state = reactive({
    companyMiniList: []
})
const newState = toRefs(state)

const formParams = reactive({
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

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createMchPlatformApi({
                pay_type_code: 'IKU',
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



