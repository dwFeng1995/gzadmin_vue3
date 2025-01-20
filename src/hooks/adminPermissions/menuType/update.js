import {reactive, ref, onMounted} from "vue"
import  {updateAdminMenuTypeApi} from '@/api/adminMenuType'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const formParams = reactive({
    id: '',
    sort: '',
    menu_type_name: ''
})

const resterForm = ()=>{
    formRef.value.resetFields()
}

const main = (props, emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateAdminMenuTypeApi(formData, formParams.id)
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
        formParams.id = props?.detail?.id
        formParams.sort = props?.detail?.sort
        formParams.menu_type_name = props?.detail?.menu_type_name
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
