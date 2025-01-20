import { reactive, ref, onMounted, toRefs} from "vue"
import  {companyMiniListApi} from '@/api/company'
import  {companyFunApi, companyFunInfoApi, updateCompanyClientFunApi} from '@/api/companyClientFun'
import {ElMessage} from "element-plus"
const formRef = ref(null)
const formParams = reactive({
    company_id: '',
    client_fun_id: '',
    client_fun_info_id: '',
    data: ''
})

const formRules = {}
const main = (props, emit)=>{
    console.log('props',props)
    const state = reactive({
        companyMiniList: [],
        companyFnList: [],
        companyFnInfoList: [],
        primaryId: null
    })
    const getCompanyMiniList = async ()=>{
        const res = await  companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const getCompanyFnList = async (id)=>{
        const res = await companyFunApi(id)
        state.companyFnList = res ?? []
    }
    const getCompanyFnInfoList = async (id)=>{
        const res = await  companyFunInfoApi(id)
        state.companyFnInfoList = res ?? []
    }

    const  initDetail = ()=>{
        getCompanyMiniList()
        state.primaryId = props?.detail?.id
        formParams.company_id = props?.detail?.company_id
        formParams.client_fun_id = props?.detail?.client_fun_id
        formParams.client_fun_info_id = props?.detail?.client_fun_info_id
        formParams.data = props?.detail?.data ?? ''
        getCompanyFnList(formParams.company_id)
        getCompanyFnInfoList(formParams.client_fun_id)
    }
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            //发起添加请求
            const res = await updateCompanyClientFunApi({data: formParams.data}, state.primaryId)
            if(Number(res) >0) {
                ElMessage.success({
                    message: '更新成功',
                    showClose: true
                })
                emit('refreshData', true)
            }else {
                console.log('res',res)
            }



        })
    }

    const resetForm = ()=>{
        state.primaryId = null
        formRef.value.resetFields()
    }
    onMounted(()=>{
        initDetail()
    })
    const newState = toRefs(state)
    return {
        formParams,
        ...newState,
        resetForm,
        submitForm
    }
}

export  {
    main,
    formRef,
    formRules
}
