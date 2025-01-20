import {reactive, ref} from "vue"
import  {createAdminPermissionsApi} from '@/api/adminPermissions'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


const formRef = ref(null)
const formParams = reactive({
    name: '',
    slug: '',
    http_method: '',
    http_path: [{value: '/'}]
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

            formData.http_path = formData.http_path.map(item=> item.value).join('\r\n')
            const res = await createAdminPermissionsApi(formData)
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
    formParams
}
