import {reactive, ref, onMounted, toRefs} from "vue"
import  {updateClintSoftVersionApi} from '@/api/software/clientVersion'
import  {getSoftVersionListApi} from '@/api/software/softVersion'
import {ElMessage} from "element-plus"

const formRef= ref(null)
const formParams = reactive({
    id: '',
    uuid: '',
    company_name: '',
    canteen_name: '',
    client_type_name: '',
    client_no: '',
    client_version_id: '',
})

const state = reactive({
    clientVersionList: []
})

const newState = toRefs(state)

const resterForm = ()=>{
    formRef.value.resetFields()
}

const initDetail = async (props)=>{
    console.log('props?.detail',props?.detail)
    formParams.id = props?.detail?.id
    formParams.uuid = props?.detail?.uuid
    formParams.company_name = props?.detail?.company_name
    formParams.canteen_name = props?.detail?.canteen_name
    formParams.client_type_name = props?.detail?.client_type_name
    formParams.client_no = props?.detail?.client_no
    formParams.cur_version = props?.detail?.cur_version
    const res = await getSoftVersionListApi({
        page: 0,
        client_type: props?.detail?.client_type_code
    })
   state.clientVersionList = res ?? []
}

const main = (props,emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await updateClintSoftVersionApi({client_version_id: formParams.client_version_id}, formParams.id)
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
        ...newState,
        resterForm,
        submitForm
    }

}

export  {
    main,
    formRef,
    formParams
}
