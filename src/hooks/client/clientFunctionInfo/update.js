import {reactive, ref, onMounted, toRefs} from "vue"
import  {updateClientFunctionInfoApi} from '@/api/clientFunctionInfo'
import  {getClientFunctionMiniListApi} from '@/api/clientFunction'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


const formRef= ref(null)

const formParams = reactive({
    id: '',
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
            const clientFunction = state.clientFunctionMiniList.filter(item=>item.checked === true)
            if (clientFunction.length  === 0) {
                return  ElMessage.error({
                    message: '至少选择一个设备设备功能',
                    showClose: true
                })
            }
            formParams.client_function = clientFunction.map(item=>item.id)
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateClientFunctionInfoApi(formData, formParams.id)
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
        await  getClientFunctionMiniList()
        formParams.id = props?.detail?.id
        formParams.client_function = props?.detail?.get_client_fun.map(item=>item.id)
        state.clientFunctionMiniList = state.clientFunctionMiniList.map(item=>Object.assign(item, {
            checked: formParams.client_function.find(x=>x === item.id) !== undefined
        }))
        formParams.name = props?.detail?.name
        formParams.remark = props?.detail?.remark
        formParams.code = props?.detail?.code
        formParams.data = props?.detail?.data

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
