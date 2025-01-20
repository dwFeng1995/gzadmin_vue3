import { reactive, ref, onMounted, toRefs, watch} from "vue"
import  {companyMiniListApi} from '@/api/company'
import  {companyFunApi, companyFunInfoApi, createCompanyClientFunApi} from '@/api/companyClientFun'
import {ElMessage} from "element-plus"
const formRef = ref(null)
const formParams = reactive({
    company_id: '',
    client_fun_id: '',
    client_fun_info_id: '',
    data: ''
})

const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'change' }
    ],
    client_fun_id: [
        { required: true, message: '请选择设备功能', trigger: 'blur' }
    ],
    client_fun_info_id: [
        { required: true, message: '请选择设备功能配置', trigger: 'blur' }
    ]
}
const main = (emit)=>{
    const state = reactive({
        companyMiniList: [],
        companyFnList: [],
        companyFnInfoList: []
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
    watch(()=>formParams.company_id,(newVal, oldVal)=>{
        if(!newVal) {
            formParams.client_fun_id = ''
            formParams.client_fun_info_id = ''
            state.companyFnList = []
            state.companyFnInfoList = []
            return
        }
        getCompanyFnList(newVal)
        console.log('newVal',newVal)
        console.log('oldVal',oldVal)
    })
    watch(()=>formParams.client_fun_id, (newVal, oldVal)=>{
        if(!newVal) {
            // formParams.client_fun_id = ''
            formParams.client_fun_info_id = ''
            // state.companyFnList = []
            state.companyFnInfoList = []
            return
        }
        getCompanyFnInfoList(newVal)
        console.log('newVal',newVal)
        console.log('oldVal',oldVal)
    })
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            //发起添加请求
            const res = await createCompanyClientFunApi(formParams)
            if(res === true) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }else {
                console.log('res',res)
            }



        })
    }

    const resetForm = ()=>{
        formRef.value.resetFields()
    }
    onMounted(()=>{
        getCompanyMiniList()
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
