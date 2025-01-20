import {reactive, ref, onMounted, toRefs} from "vue"
import  {updateClientModelApi} from '@/api/clientModel'
import  {allClientTypeApi} from '@/api/clientType'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


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

const resterForm = ()=>{
    formRef.value.resetFields()
}

const state = reactive({
    clientTypeMiniList: []
})

const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
}

const main = (props, emit)=>{
    console.log('emit', emit)
    console.log('props', props.detail)
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res =   await updateClientModelApi(formData, formParams.id)
            if (Number(res) >0) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }


        })

    }


    const initDetail =  async ()=>{
        await getClientTypeMiniList()
        formParams.id = props?.detail?.id
        formParams.fun_name = props?.detail?.fun_name
        formParams.fun_type = props?.detail?.fun_type
        formParams.remark = props?.detail?.remark
        formParams.fun_type_id = props?.detail?.fun_type_id
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
