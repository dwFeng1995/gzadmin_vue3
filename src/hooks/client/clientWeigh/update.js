import {reactive, toRefs, ref, onMounted} from "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {updateClientWeighApi} from '@/api/clientWeigh'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object";


const formRef= ref(null)
const formParams = reactive({
    canteen_id: '',
    device_no: '',
    device_name: '',
    device_no_complete: '',
    remark: '',
    is_on: 1,
    id: ''
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
            formData.device_no_complete = undefined
            const res = await updateClientWeighApi(formData, formParams.id)
            if(res) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })

    }
    const initDetail =  async ()=>{
        await  getCanteenMiniList()
        formParams.id = props?.detail?.id
        formParams.canteen_id = props?.detail?.canteen_id
        formParams.device_no_complete = props?.detail?.device_no
        formParams.device_no = props?.detail?.device_no.substring(props?.detail?.device_no.length -2, props?.detail?.device_no.length)
        formParams.device_name = props?.detail?.device_name
        formParams.remark = props?.detail?.remark
        formParams.is_on = props?.detail?.is_on
    }

    onMounted(()=>{
        initDetail()
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
