import {reactive, toRefs, onMounted, ref} from  "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {allClientTypeApi} from '@/api/clientType'
import {createLogCanteenClientStoreApi} from '@/api/logCanteenClientStore'
import {ElMessage} from "element-plus"

const formRef = ref(null)

const formParams = reactive({
    canteen_id: '',
    client_type: '',
    start_num: '',
    end_num: ''
})


const checkStartNum = (rule, value, callback)=>{
    if(!value) {
        return callback(new Error('请输入开始编号'))
    }else {
        if( !/(^[0-9]\d*$)/.test(value)) {
            return callback(new Error('开始编号只能是两位数字'))
        }else if(Number(value) === 0   || Number(value)>99) {
            return callback(new Error('开始编号只能是1 - 99'))
        }
        else {
            callback()
        }
    }
}

const checkEndNum = (rule, value, callback)=>{
    if(!value) {
        return callback(new Error('请输入结束编号'))
    }else {
        if( !/(^[0-9]\d*$)/.test(value)) {
            return callback(new Error('结束编号只能是两位数字'))
        }else if(Number(value) === 0   || Number(value)>99) {
            return callback(new Error('结束编号只能是1 - 99'))
        }
        else {
            if(value <= formParams.start_num) {
                return callback(new Error('结束编号必须大于开始编号'))
            }else {
                callback()
            }
        }
    }
}

const formRules = {
    canteen_id: [
        { required: true, message: '请选择食堂', trigger: 'change' }
    ],
    client_type: [
        { required: true, message: '请选择设备类型', trigger: 'change' }
    ],
    start_num: [
        { validator: checkStartNum, trigger: 'blur' }
    ],
    end_num: [
        { validator: checkEndNum, trigger: 'blur' }
    ]
}

const state = reactive({
    canteenMiniList: [],
    clientTypeMiniList: [],
})

const getCanteenMiniList = async ()=>{
    const res = await getCanteenMiniListApi()
    state.canteenMiniList = res ?? []
}
const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
}
const resetForm = ()=>{
    formRef.value.resetFields()
}




const main = (emit)=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getCanteenMiniList()
        getClientTypeMiniList()
    })
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if (!valid) {
                return
            }
            const res = await createLogCanteenClientStoreApi(formParams)
            if (res) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
    }
    return {
        ...newState,
        resetForm,
        submitForm
    }
}

export {
    main,
    formRef,
    formParams,
    formRules
}
