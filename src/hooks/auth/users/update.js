import {reactive, ref, onMounted} from "vue"
import  {updateUserApi} from '@/api/admin'
import {ElMessage} from "element-plus"
import md5 from "blueimp-md5"
import {deepCopy} from "@/utils/object";

//

const formRef= ref(null)
const formParams = reactive({
    id: '',
    name: '',
    username: '',
    password: '',
    is_on: 1
})


const resterForm = ()=>{
    formRef.value.resetFields()
}

const initDetail = (props)=>{
    console.log('props?.detail',props?.detail)
    formParams.id = props?.detail?.id
    formParams.name = props?.detail?.name
    formParams.username = props?.detail?.username
    formParams.is_on = props?.detail?.is_on
}

const main = (props,emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData  = deepCopy(formParams)
            formData.password = md5(formData.password)
            formData.id = undefined
            const res = await updateUserApi(formData, formParams.id)
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
