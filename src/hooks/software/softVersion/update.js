import {reactive, ref, onMounted, toRefs} from "vue"
import  {updateSoftVersionApi} from '@/api/software/softVersion'
import {ElMessage} from "element-plus"
import  {getOssSignatureApi} from '@/api/oss/getSignature'
import  {companyMiniListApi} from '@/api/company'
import {deepCopy} from "@/utils/object"

const uploadData = {
    key: '',
    OSSAccessKeyId: '',
    success_action_status: 200,
    signature: '',
    policy: ''
}

const uploadRef = ref(null)
const formRef= ref(null)
const formParams = reactive({
    id: '',
    company_id: '',
    download_url: '',
    client_type_code: '',
    version: '',
    status: '',
    is_force: 0,
    remark: ''
})

const state = reactive({
    companyMiniList: [
        {
            id: 0,
            company_name: '公用'
        }
    ],
    fileList: [],
    file: null,
    uploadPath: ''
})

const newState = toRefs(state)
const resterForm = ()=>{
    formRef.value.resetFields()
}
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList  = state.companyMiniList.concat(res ?? [])
}

const getOssSignature = async ()=>{
    const res = await getOssSignatureApi({
        folder_type: 'client_apk',
        client_type: formParams.client_type_code
    })
    uploadData.key = `${res.dir}/${state.file?.name}`
    uploadData.OSSAccessKeyId = res.accessid
    uploadData.signature = res.signature
    uploadData.policy = res.policy
    state.uploadPath = res.host
    console.log('签名',res)
}

const  uploadFile = async ()=> {
    if (formParams.client_type_code === '') {
        return  ElMessage.error({
            message: '请先选择设备类型!',
            showClose: true
        })
    }
    await getOssSignature()
    uploadRef.value.submit()
}

const  uploadExceed = (files, fileList)=> {
    ElMessage.error({
        message: '只能选择一个文件!',
        showClose: true
    })
    console.log(files, fileList)
}
const  beforeAvatarUpload = (file,fileList)=> {
    state.file = file
    console.log(file, fileList)
}

const  uploadError = (err, file, fileList)=> {
    ElMessage.error({
        message: '上传文件出错！',
        showClose: true
    })
    state.fileList = []
    console.log(err, file, fileList)
}

const  uploadSuccess = (response, file, fileList)=> {
    ElMessage.success({
        message: '上传文件成功！',
        showClose: true
    })
    formParams.download_url = `${state.uploadPath}/${uploadData.key}`
    console.log('response',response)
    console.log(response, file, fileList)
}

const  removeFile = (file, fileList)=> {
    state.fileList = []
    formParams.download_url = ''
    console.log(file, fileList)
}

const initDetail = async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.company_id = props?.detail?.company_id
    formParams.download_url = props?.detail?.download_url
    formParams.client_type_code = props?.detail?.client_type_code
    formParams.version = props?.detail?.version
    formParams.status = props?.detail?.status
    formParams.is_force = props?.detail?.is_force
    formParams.remark = props?.detail?.remark
}

const main = (props, emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateSoftVersionApi(formData, formParams.id)
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
    formParams,
    uploadExceed,
    uploadFile,
    uploadError,
    beforeAvatarUpload,
    uploadSuccess,
    removeFile,
    uploadRef,
    uploadData
}
