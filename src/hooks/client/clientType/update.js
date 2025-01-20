import {reactive, ref, onMounted} from "vue"
import  {updateClientTypeApi} from '@/api/clientType'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


const formRef= ref(null)
const formParams = reactive({
    client_type: '',
    name: '',
    remark: '',
    isshow: 1,
    id: ''
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
            const res = await updateClientTypeApi(formData, formParams.id)
            if(res) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })

    }
    const initDetail =  ()=>{
        formParams.id = props?.detail?.id
        formParams.client_type = props?.detail?.client_type
        formParams.name = props?.detail?.name
        formParams.remark = props?.detail?.remark
        formParams.isshow = props?.detail?.isshow
    }

    onMounted(()=>{
        initDetail()
    })
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
