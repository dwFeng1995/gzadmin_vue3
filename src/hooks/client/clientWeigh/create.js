import {reactive, toRefs, ref, onMounted} from "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {createClientWeighApi} from '@/api/clientWeigh'
import {ElMessage} from "element-plus"



const formRef= ref(null)
const formParams = reactive({
    canteen_id: '',
    device_no: '',
    device_name: '',
    remark: '',
    is_on: 1
})

const checkDeviceNo = (rule, value, callback)=>{
    if(!value) {
        return callback(new Error('请输入设备编号'))
    }else {
        if( !/(^[0-9]\d*$)/.test(value)) {
            return callback(new Error('设备编号只能是两位数字'))
        }else if(Number(value) === 0   || Number(value)>99) {
            return callback(new Error('设备编号只能是1 - 99'))
        }
        else {
            callback()
        }
    }
}

const formRules = {
    canteen_id: [
        { required: true, message: '请选择食堂', trigger: 'change' }
    ],
    device_name: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
    ],
    device_no: [
        { validator: checkDeviceNo, trigger: 'blur' }
    ]
}
const state = reactive({
    canteenMiniList: ''
})


const getCanteenMiniList = async ()=>{
    const res = await getCanteenMiniListApi()
    state.canteenMiniList = res ?? []
}
const resterForm = ()=>{
    formRef.value.resetFields()
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createClientWeighApi(formParams)
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
        getCanteenMiniList()
    })
    const newState  = toRefs(state)
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
