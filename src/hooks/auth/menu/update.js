import {reactive, ref, onMounted} from "vue"
import  {updateMenuApi} from '@/api/menu'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object";


const formRef= ref(null)
const formParams = reactive({
    id: '',
    parent_id: 0,
    title: '',
    order: '',
    uri: '',
    icon: '',
    route_name: '',
    is_hidden: 0
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
            formData.id  = undefined
            const res = await updateMenuApi(formData,formParams.id)
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
        formParams.parent_id = props?.detail?.parent_id
        formParams.title = props?.detail?.title
        formParams.order = props?.detail?.order
        formParams.uri = props?.detail?.uri 
        formParams.route_name = props?.detail?.route_name
        formParams.is_hidden = props?.detail?.is_hidden
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
