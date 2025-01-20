import  {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'
import  {uploadWetchPublicFileApi} from  '@/api/paymentPlatform'


const formRef = ref(null)
const formParams = reactive({
    name: '',
    text: ''
})

const formRules =  {
    name: [
        { required: true, message: '请输入文件名', trigger: 'blur' },
    ],
    text: [
        { required: true, message: '请输粘贴证书内容', trigger: 'blur' },
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
            const res = await uploadWetchPublicFileApi(formParams)
            if(res> 0 || res === true) {
                ElMessage.success({
                    message: '上传成功成功',
                    showClose: true
                })
                emit('refreshData', false)
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
    formRef,
    formParams,
    main,
    formRules
}
