import {reactive, ref, onMounted} from "vue"
import  {updateAgreementApi} from '@/api/agreement'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


const formRef= ref(null)

const formParams = reactive({
    id: '',
    code: '',
    name: '',
    content: ''
})

const getContent = (val)=>{
    formParams.content = val
}

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
            const res = await updateAgreementApi(formData, formParams.id)
            if(Number(res) >0 ) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })

    }
    const initDetail =   ()=>{
        console.log(' formParams.content', formParams.content)
        formParams.id = props?.detail?.id
        formParams.name = props?.detail?.name
        formParams.code = props?.detail?.code
        formParams.content = props?.detail?.content
        console.log(' formParams.content----', formParams.content)
    }

    onMounted(()=>{
        initDetail()
    })

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
