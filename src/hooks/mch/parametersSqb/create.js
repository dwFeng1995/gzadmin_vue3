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
    appid: '2018072400000864',
    name: '',
    remark: '',
    vendor_key: 'a4a0789c1449c4eaf883e5f5e9121ef9',
    vendor_sn: '91800438'
})


//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    formRef.value.resetFields()
    state.secret_key = 'a4a0789c1449c4eaf883e5f5e9121ef9'
    state.secret_sn = '91800438'
    state.secret_key = '2018072400000864'
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createMchPlatformApi({
                pay_type_code: 'SQB',
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



