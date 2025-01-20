import {reactive, ref, onMounted, toRefs} from "vue"
import  {updateClientFunctionApi} from '@/api/clientFunction'
import  {allClientTypeApi} from '@/api/clientType'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


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

const getClientTypeMiniList = async ()=> {
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []

}

// const resterForm = ()=>{
//     formRef.value.resetFields()
// }

const main = (props, emit)=>{
    console.log('emit', emit)
    console.log('props', props.detail)
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
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateClientFunctionApi(formData, formParams.id)
            if(res === true) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })

    }
    const initDetail =  async ()=>{
        await  getClientTypeMiniList()
        formParams.id = props?.detail?.id
        formParams.client_type = props?.detail?.get_client_type.map(item=>item.id)
        state.clientTypeMiniList = state.clientTypeMiniList.map(item=>Object.assign(item, {
            checked: formParams.client_type.find(x=>x === item.id) !== undefined
        }))
        formParams.fun_name = props?.detail?.fun_name
        formParams.remark = props?.detail?.remark
        formParams.fun_code = props?.detail?.fun_code

    }

    onMounted(()=>{
        initDetail()
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
