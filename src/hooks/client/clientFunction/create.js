import {reactive, ref, toRefs, onMounted} from "vue"
import  {createClientFunctionaApi} from '@/api/clientFunction'
import  {allClientTypeApi} from '@/api/clientType'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    client_type: [],
    fun_name: '',
    remark: '',
    fun_code: ''
})

const formRules = {
    fun_name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    fun_code: [
        { required: true, message: '请输入代号', trigger: 'blur' }
    ]
}

const resterForm = ()=>{
    formRef.value.resetFields()
}

const state =  reactive({
    clientTypeMiniList: []
})
const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
    state.clientTypeMiniList = state.clientTypeMiniList.map(item=>Object.assign(item, {
        checked: false
    }))
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const   clientType = state.clientTypeMiniList.filter(item=>item.checked === true)
            if (clientType.length  === 0) {
                return  ElMessage.error({
                    message: '至少选择一个设备类型',
                    showClose: true
                })
            }
            formParams.client_type = clientType.map(item=>item.id)
            const res = await createClientFunctionaApi(formParams)
            if(res === true) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log(formParams.client_type)
        console.log('emit', emit)
    }
    onMounted(()=>{
        getClientTypeMiniList()
    })
    const newState = toRefs(state)
    return {
        ...newState,
        resterForm,
        submitForm
    }

}

export  {
    main,
    formRef,
    formParams,
    formRules
}
