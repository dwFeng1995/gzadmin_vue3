import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import { baseApi } from '@/utils/baseUrl'
import store from '@/store/index'
import  {companyMiniListApi} from '@/api/company'
import  {updateMchPlatformApi} from  '@/api/paymentPlatform'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const keyUploadRef = ref(null)
const crtUploadRef = ref(null)
const uploadFilePath = `${baseApi()}admin/file/certificateUpload`
const uploadHeader = {
    'Authorization' : store.getters?.getToken
}

const state = reactive({
    keyFileList: [],
    crtFileList: [],
    companyMiniList: []
})
const newState = toRefs(state)

const formParams = reactive({
    name: '',
    company_id: '',
    appid: '',
    path_key: '',
    path_crt: '',
    remark: '',
    redirect_url: ''
})
const  keyUploadFile = ()=> {
    if(formParams.company_id === ''){
        return  ElMessage.error({
            message: '请先选择企业',
            showClose: true
        })
    }
    keyUploadRef.value.submit();
}

const  crtUploadFile = ()=> {
    if(formParams.company_id === ''){
        return  ElMessage.error({
            message: '请先选择企业',
            showClose: true
        })
    }
    crtUploadRef.value.submit();
}

const keyUploadExceed = (files, fileList)=> {
    ElMessage.error({
        message: '只能上传一个文件!',
        showClose: true
    })
    console.log(files, fileList)
}

const  crtUploadExceed = (files, fileList)=> {
    ElMessage.error({
        message: '只能上传一个文件!',
        showClose: true
    })
    console.log(files, fileList)
}

const keyBeforeAvatarUpload = (file,fileList)=> {
    const index = file.name.lastIndexOf(".");
    const suffix = file.name.substr(index+1);
    const isKey = suffix.toLowerCase() === 'key'
    if (!isKey) {
        ElMessage.error({
            message: '只能是.key文件!',
            showClose: true
        })
        state.keyFileList = []
    }else {
        state.keyFileList = fileList
    }
    return isKey
}

const crtBeforeAvatarUpload = (file,fileList)=> {
    const index = file.name.lastIndexOf(".");
    const suffix = file.name.substr(index+1);
    const isCrt = suffix.toLowerCase() === 'crt'
    if (!isCrt) {
        ElMessage.error({
            message: '只能是.crt文件!',
            showClose: true
        })
        state.crtFileList = []
    }else {
        state.crtFileList = fileList
    }
    return isCrt
}

const keyUploadError = (err, file, fileList) => {
    ElMessage.error({
        message: '上传文件出错',
        showClose: true
    })
    state.keyFileList = []
    console.log(err, file,fileList )
}
const crtUploadError = (err, file, fileList)=> {
    ElMessage.error({
        message: '上传文件出错',
        showClose: true
    })
    state.crtFileList = []
    console.log(err, file,fileList )
}
const  keyUploadSuccess = (response, file, fileList)=> {
    if(response.sub_code !== 'SUCCESS') {
        return   ElMessage.error({
            message: response.msg,
            showClose: true
        })
    }
    ElMessage.success({
        message: '文件上传成功',
        showClose: true
    })
    formParams.path_key  = response.data
    console.log(file,fileList)
}
const  crtUploadSuccess = (response, file, fileList)=>{
    if(response.sub_code !== 'SUCCESS') {
        return   ElMessage.error({
            message: response.msg,
            showClose: true
        })
    }
    ElMessage.success({
        message: '文件上传成功',
        showClose: true
    })
    formParams.path_crt  = response.data
    console.log(fileList,file)
}

const  keyRemoveFile = (file, fileList)=> {
    state.keyFileList = []
    formParams.path_key = ''
    console.log(file,fileList )
}
const   crtRemoveFile = (file, fileList)=> {
    state.crtFileList = []
    formParams.path_crt = ''
    console.log(file,fileList )
}



//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    state.keyFileList = []
    state.crtFileList = []
    formRef.value.resetFields()
}

const  initDetail = async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.company_id = props?.detail?. company_id
    formParams.appid = props?.detail?. appid
    formParams.path_key =  props?.detail?. path_key
    formParams.remark = props?.detail?.remark
    formParams.path_crt = props?.detail?.path_crt
    formParams.redirect_url = props?.detail?.redirect_url
    formParams.name = props?.detail?.name
}
const main = (props, emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateMchPlatformApi({
                pay_type_code: 'ABC_CENTER',
                company_id: formParams.company_id,
                ...formData
            },formParams.id)
            if(res>= 0 || res === true) {
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
    formParams,
    formRef,
    uploadFilePath,
    uploadHeader,
    crtRemoveFile,
    keyRemoveFile,
    crtUploadSuccess,
    keyUploadSuccess,
    keyUploadError,
    crtUploadError,
    crtBeforeAvatarUpload,
    keyBeforeAvatarUpload,
    keyUploadExceed,
    crtUploadExceed,
    keyUploadFile,
    crtUploadFile,
    main,
    keyUploadRef,
    crtUploadRef

}
