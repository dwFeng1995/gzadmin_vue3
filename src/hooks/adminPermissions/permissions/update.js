import {reactive, ref, onMounted} from "vue"
import  {updateAdminPermissionsApi} from '@/api/adminPermissions'
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


const initDetail = (props)=>{
    formParams.id = props?.detail?.id
    formParams.name = props?.detail?.name
    formParams.slug = props?.detail?.slug
    formParams.http_method = props?.detail?.http_method
    formParams.http_path = props?.detail?.http_path.map(item=>{
        return {
            value: item
        }
    })

}

const main = (props, emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData  = deepCopy(formParams)
            formData.http_path = formData.http_path.map(item=> item.value).join('\r\n')
            formData.id  = undefined
            const res = await updateAdminPermissionsApi(formData, formParams.id)
            if(res) {
                ElMessage.success({
                    message: '更新成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log('emit', emit)
    }
    onMounted(()=>{
        initDetail(props)
    })
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
