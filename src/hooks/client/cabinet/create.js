import {reactive, toRefs, ref, onMounted} from "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {createCabinetApi} from '@/api/cabinet'
import {ElMessage} from "element-plus"



const formRef= ref(null)
const formParams = reactive({
    canteen_id: '',
    cabinet_id: '',
    cabinet_name: '',
    admin_code: '',
    shop_address: '',
    shop_phone: '',
    describe: '',
    is_on: 1
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

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createCabinetApi(formParams)
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
