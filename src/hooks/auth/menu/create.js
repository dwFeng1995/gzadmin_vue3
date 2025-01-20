import {reactive, ref} from "vue"
import  {createMenuApi} from '@/api/menu'
import {ElMessage} from "element-plus"


const formRef= ref(null)
const formParams = reactive({
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


const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createMenuApi(formParams)
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
