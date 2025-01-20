import {reactive, ref} from "vue"
import  {createClientTypeApi} from '@/api/clientType'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    client_type: '',
    name: '',
    remark: '',
    isshow: 1
})

const formRules = {
    client_type: [
        { required: true, message: '请输入设备类型', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
    ]
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
            const res = await createClientTypeApi(formParams)
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
    return {
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
