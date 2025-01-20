import {reactive, ref, onMounted} from "vue"
import  {updateFaceSystemApi} from '@/api/faceSystem'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


const formRef= ref(null)

const formParams = reactive({
    id: '',
    code: '',
    name: '',
    remrak: '',
    model: ''
})


const resterForm = ()=>{
    formRef.value.resetFields()
}

const main = (props, emit)=>{
    console.log('emit', emit)
    console.log('props', props.detail)
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateFaceSystemApi(formData, formParams.id)
            if(res > 0) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })

    }
    const initDetail =  async ()=>{
        formParams.id = props?.detail?.id
        formParams.code = props?.detail?.code
        formParams.name = props?.detail?.name
        formParams.remrak = props?.detail?.remrak
        formParams.model = props?.detail?.model

    }

    onMounted(()=>{
        initDetail()
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
