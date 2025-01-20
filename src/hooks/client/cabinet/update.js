import {reactive, toRefs, ref, onMounted} from "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {updateCabinetApi} from '@/api/cabinet'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object";


const formRef= ref(null)
const formParams = reactive({
    canteen_id: '',
    cabinet_id: '',
    cabinet_name: '',
    admin_code: '',
    shop_address: '',
    shop_phone: '',
    describe: '',
    is_on: 1,
    id: ''
})

const formRules = {
    canteen_id: [
        { required: true, message: '请选择食堂', trigger: 'change' }
    ],
    cabinet_name: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
    ],
    admin_code: [
        { required: true, message: '请输入管理员密码', trigger: 'blur' }
    ],
    shop_address: [
        { required: true, message: '请输入店铺地址', trigger: 'blur' }
    ],
    shop_phone: [
        { required: true, message: '请输入店铺电话', trigger: 'blur' }
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
            const res = await updateCabinetApi(formData, formParams.id)
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
        formParams.cabinet_id = props?.detail?.cabinet_id
        formParams.canteen_id = props?.detail?.canteen_id
        formParams.cabinet_name = props?.detail?.cabinet_name
        formParams.admin_code = props?.detail?.admin_code
        formParams.shop_address = props?.detail?.shop_address
        formParams.shop_phone = props?.detail?.shop_phone
        formParams.describe = props?.detail?.describe
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
