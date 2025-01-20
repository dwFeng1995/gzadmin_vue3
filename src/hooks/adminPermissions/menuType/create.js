import {reactive, ref} from "vue"
import  {createAdminMenuTypeApi} from '@/api/adminMenuType'
import {ElMessage} from "element-plus"


const formRef = ref(null)
const formParams = reactive({
    sort: '',
    menu_type_name: ''
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
            const res = await createAdminMenuTypeApi(formParams)
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
