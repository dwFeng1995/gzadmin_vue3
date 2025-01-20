import {reactive, ref, toRefs, onMounted} from "vue"
import  {createClientFunctionInfoApi} from '@/api/clientFunctionInfo'
import  {getClientFunctionMiniListApi} from '@/api/clientFunction'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    client_function: [],
    name: '',
    remark: '',
    code: '',
    data: ''
})

const formRules = {
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入代号', trigger: 'blur' }
    ]
}

const resterForm = ()=>{
    formRef.value.resetFields()
}

const state =  reactive({
    clientFunctionMiniList: []
})
const getClientFunctionMiniList = async ()=>{
    const res  = await getClientFunctionMiniListApi()
    state.clientFunctionMiniList = res ?? []
    state.clientFunctionMiniList = state.clientFunctionMiniList.map(item=>Object.assign(item, {
        checked: false
    }))
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const   clientFunction = state.clientFunctionMiniList.filter(item=>item.checked === true)
            if (clientFunction.length  === 0) {
                return  ElMessage.error({
                    message: '至少选择一个设备设备功能',
                    showClose: true
                })
            }
            formParams.client_function = clientFunction.map(item=>item.id)
            const res = await createClientFunctionInfoApi(formParams)
            if(res === true) {
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
        getClientFunctionMiniList()
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
