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
    name: '',
    remark: ''
})



//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    state.fileList = []
    formRef.value.resetFields()
}

const initDetail =  async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.name = props?.detail?.name
    formParams.company_id = props?.detail?. company_id
    formParams.remark = props?.detail?.remark
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
                pay_type_code: 'GEZI',
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



