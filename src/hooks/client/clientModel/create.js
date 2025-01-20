import {reactive, ref, toRefs, onMounted} from "vue"
import  {createClientModelApi} from '@/api/clientModel'
import {ElMessage} from "element-plus"
import  {allClientTypeApi} from '@/api/clientType'

const formRef= ref(null)
const formParams = reactive({
    fun_type: '',
    fun_name: '',
    remark: '',
    fun_type_id: ''
})

const formRules = {
    fun_type: [
        { required: true, message: '请输入模式', trigger: 'blur' }
    ],
    fun_name: [
        { required: true, message: '请输入名称', trigger: 'blur' }
    ],
    fun_type_id:[
        { required: true, message: '请选择设备类型名称', trigger: 'change' }
    ]
}

const state = reactive({
    clientTypeMiniList: []
})

const resterForm = ()=>{
    formRef.value.resetFields()
}

const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
}
const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createClientModelApi(formParams)
            if(res) {
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
