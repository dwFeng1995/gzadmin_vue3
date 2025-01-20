import {reactive, ref} from "vue"
import  {createAgreementApi} from '@/api/agreement'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    code: '',
    name: '',
    content: ''
})



const resterForm = ()=>{
    formRef.value.resetFields()
}

const getContent = (val)=>{
    formParams.content = val
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createAgreementApi(formParams)
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
        submitForm,
        getContent
    }

}

export  {
    main,
    formRef,
    formParams
}
