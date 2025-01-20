import {reactive, ref} from "vue"
import  {createFaceSystemApi} from '@/api/faceSystem'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    code: '',
    name: '',
    remrak: '',
    model: ''
})



const resterForm = ()=>{
    formRef.value.resetFields()
}


const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createFaceSystemApi(formParams)
            if(res === true) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log(formParams.client_type)
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
    formParams
}
