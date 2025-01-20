import {reactive, onMounted, toRefs, watch, ref} from  "vue"
import  {allClientTypeApi} from '@/api/clientType'
import {getCanteenMiniListApi} from '@/api/canteen'
import  {getClientModelMiniListApi} from '@/api/clientModel'
import {createCanteenClientApi} from  '@/api/canteenClient'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    client_no: '',
    canteen_id: '',
    client_type_id: '',
    client_model_id: '',
    client_name: '',
    remark: '',
    is_default: 0,
    status: 1
})

const checkCanteenNo = (rule, value, callback)=>{
    if(!value) {
        return callback(new Error('请输入设备编号'))
    }else {
        if( !/(^[0-9]\d*$)/.test(value)) {
            return callback(new Error('设备编号只能是两位数字'))
        }else if(Number(value) === 0) {
            return callback(new Error('设备编号不能为0'))
        }else {
            callback()
        }
    }
}
const formRules = {
    client_no: [
        { validator: checkCanteenNo, trigger: 'blur' }
    ],
    canteen_id: [
        { required: true, message: '请选择食堂', trigger: 'change' }
    ],
    client_type_id: [
        { required: true, message: '请选择设备类型', trigger: 'change' }
    ],
    client_model_id: [
        { required: true, message: '请选择默认显示', trigger: 'change' }
    ]
}

const state = reactive({
    clientTypeMiniList: [],
    canteenMiniList: [],
    clientModelMiniList: []
})
const main = (emit)=>{
    const newState = toRefs(state)
    const getClientTypeMiniList = async ()=>{
        const res  = await allClientTypeApi()
        state.clientTypeMiniList = res ?? []
    }
    const getCanteenMiniList = async ()=>{
        const res = await getCanteenMiniListApi()
        state.canteenMiniList = res ?? []
    }
    const getClientModelMiniList = async ()=>{
        const res = await getClientModelMiniListApi({
            client_type_id: formParams.client_type_id
        })
        state.clientModelMiniList = res ?? []
    }
    const resterForm = ()=>{
        formRef.value.resetFields()
    }
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createCanteenClientApi(formParams)
            if(res) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
    }
    onMounted(()=>{
        getClientTypeMiniList()
        getCanteenMiniList()
    })
    watch(()=>formParams.client_type_id,(newVal, oldVal)=>{
        formParams.client_model_id = ''
        state.clientModelMiniList = []
        if(newVal) {
            getClientModelMiniList()
        }
        console.log(newVal, '---', oldVal)
    })
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
