import {reactive, ref} from "vue"
import  {createUserApi} from '@/api/admin'
import {ElMessage} from "element-plus"
import md5 from "blueimp-md5"
import {deepCopy} from "@/utils/object"


const formRef= ref(null)
const formParams = reactive({
    name: '',
    username: '',
    password: ''
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
            const formData  = deepCopy(formParams)
            formData.password = md5(formData.password)
            const res = await createUserApi(formData)
            if(Object.keys(res ?? {}).length > 0) {
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
    formParams
}
