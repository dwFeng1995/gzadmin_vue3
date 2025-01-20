import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import { baseApi } from '@/utils/baseUrl'
import store from '@/store/index'
import  {companyMiniListApi} from '@/api/company'
import  {updateMchPlatformApi} from  '@/api/paymentPlatform'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const pfxUploadRef = ref(null)
const uploadFilePath = `${baseApi()}admin/file/certificateUpload`
const uploadHeader = {
    'Authorization' : store.getters?.getToken
}

const state = reactive({
    fileList : [],
    companyMiniList: []
})

const newState = toRefs(state)
const formParams = reactive({
    name: '',
    company_id: '',
    appid: '',
    err_url: '',
    pay_cert_file: '',
    store_file: '',
    store_password: '',
    mch_id: '',
    log_path: '',
    merchant_cert_file: '',
    merchant_password: '',
    remark: ''
})


const uploadFile = ()=> {
    if(formParams.company_id === ''){
        return  ElMessage.error({
            message: '请先选择企业',
            showClose: true
        })
    }
    pfxUploadRef.value.submit();
}

const  uploadExceed = (files, fileList)=> {
    ElMessage.error({
        message: '只能上传一个文件!',
        showClose: true
    })
    console.log(files, fileList)
}

const  beforeAvatarUpload = (file,fileList)=> {
    const index = file.name.lastIndexOf(".");
    const suffix = file.name.substr(index+1);
    const isPfx = suffix.toLowerCase() === 'pfx'
    if (!isPfx) {
        ElMessage.error({
            message: '只能是.pfx文件!',
            showClose: true
        })
        state.fileList = []
    }else {
        state.fileList = fileList
    }
    return isPfx;
}

const  uploadError = (err, file, fileList)=> {

    ElMessage.error({
        message: '上传文件出错',
        showClose: true
    })
    state.fileList = []
    console.log(err, file,fileList )
}

const  uploadSuccess = (response, file, fileList)=> {
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
    formParams.merchant_cert_file  = response.data
    console.log(file, fileList)
}

const  removeFile = (file, fileList)=> {
    state.fileList = []
    formParams.merchant_cert_file = ''
    console.log(file, fileList)
}



//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    state.fileList = []
    formRef.value.resetFields()
}


const  initDetail = async (props)=>{
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.company_id = props?.detail?. company_id
    formParams.appid = props?.detail?. appid
    formParams.err_url =  props?.detail?. err_url
    formParams.remark = props?.detail?.remark
    formParams.pay_cert_file = props?.detail?.pay_cert_file
    formParams.store_file = props?.detail?.store_file
    formParams.name = props?.detail?.name
    formParams.store_password = props?.detail?.store_password
    formParams.mch_id = props?.detail?.mch_id
    formParams.log_path = props?.detail?.log_path
    formParams.merchant_cert_file = props?.detail?.merchant_cert_file
    formParams.merchant_password = props?.detail?.merchant_password
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
                pay_type_code: 'ABC',
                company_id: formParams.company_id,
                ...formData
            }, formParams.id)
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
    pfxUploadRef,
    formParams,
    formRef,
    main,
    uploadFilePath,
    uploadHeader,
    uploadFile,
    uploadExceed,
    beforeAvatarUpload,
    uploadError,
    uploadSuccess,
    removeFile
}
