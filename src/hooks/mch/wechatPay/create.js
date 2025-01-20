import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import { baseApi } from '@/utils/baseUrl'
import store from '@/store/index'
import  {companyMiniListApi} from '@/api/company'
import  {createMchPlatformApi} from  '@/api/paymentPlatform'
const formRef = ref(null)
const keyUploadRef = ref(null)
const pubUploadRef = ref(null)
const formParams = reactive({
    company_id: '',
    name: '',
    appid: '',
    mch_id: '',
    cert_path: '',
    key_path: '',
    remark: '',
    key: '',
    app_sert: '',
    template_id: '',
    template_cabinet: '',
    template_mini_order: '',
    template_call:'',
    url_h5: ''
})



const uploadFilePath = `${baseApi()}admin/file/certificateUpload`
const uploadHeader = {
    'Authorization' : store.getters?.getToken
}

const state = reactive({
    keyFileList: [],
    pubFileList: [],
    companyMiniList: []
})
const newState = toRefs(state)
const  keyUploadFile = ()=> {
    if(formParams.company_id === '')
    {
        return  ElMessage.error({
            message: '请先选择企业',
            showClose: true
        })
    }
    keyUploadRef.value.submit();
}
const pubUploadFile =()=> {
    console.log('pubUploadRef.value',pubUploadRef.value)
    if(formParams.company_id === ''){
        return  ElMessage.error({
            message: '请先选择企业',
            showClose: true
        })
    }
 
    pubUploadRef.value.submit();
}
const  keyUploadExceed = (files, fileList)=> {
    ElMessage.error({
        message: '只能选择一个文件',
        showClose: true
    })
    console.log(files,fileList )
}
const   pubUploadExceed = (files, fileList)=> {
    ElMessage.error({
        message: '只能选择一个文件',
        showClose: true
    })
    console.log(files,fileList )
}
const  keyBeforeAvatarUpload = (file,fileList)=> {
    const index = file.name.lastIndexOf(".");
    const suffix = file.name.substr(index+1);
    const isKey = suffix.toLowerCase() === 'pem'
    if (!isKey) {
        ElMessage.error({
            message: '只能是.pem文件',
            showClose: true
        })
        state.keyFileList = []
    }else {
        state.keyFileList = fileList
    }
    return isKey;
}
const   pubBeforeAvatarUpload = (file,fileList)=> {
    const index = file.name.lastIndexOf(".");
    const suffix = file.name.substr(index+1);
    const isPub = suffix.toLowerCase() === 'pem'
    if (!isPub) {
        ElMessage.error({
            message: '只能是.pem文件',
            showClose: true
        })
        state.pubFileList = []
    }else {
        state.pubFileList = fileList
    }
    return isPub;
}

const   keyUploadError = (err, file, fileList)=> {
    ElMessage.error({
        message: '上传文件出错',
        showClose: true
    })
    state.keyFileList = []
    console.log(err, file, fileList)
}
const  pubUploadError = (err, file, fileList)=> {
    ElMessage.success({
        message: '上传文件出错',
        showClose: true
    })
    state.pubFileList = []
    console.log(err, file, fileList)
}
const  keyUploadSuccess = (response, file, fileList)=>{
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
    formParams.cert_path  = response.data
    console.log(response,file,fileList)
}
const  pubUploadSuccess = (response, file, fileList)=>{
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
    formParams.key_path  = response.data
    console.log(response,file,fileList)
}

const  keyRemoveFile = (file, fileList)=> {
    state.keyFileList = []
    formParams.cert_path = ''
    console.log(file,fileList )
}

const  pubRemoveFile = (file, fileList)=> {
    state.pubFileList = []
    formParams.key_path = ''
    console.log(file,fileList )
}

//企业列表  不分页
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = ()=>{
    state.pubFileList = []
    state.keyFileList = []
    // keyUploadRef.value.clearFiles()
    // pubUploadRef.value.clearFiles()
    formRef.value.resetFields()
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createMchPlatformApi({
                pay_type_code: 'W',
                company_id: formParams.company_id,
                data: [formParams]
            })
            if(res> 0 || res === true) {
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
        getCompanyMiniList()
    })
    return {
        ...newState,
        resterForm,
        submitForm
    }
}



export  {
    formRef,
    formParams,
    keyUploadRef,
    pubUploadRef,
    keyUploadFile,
    pubUploadFile,
    keyUploadExceed,
    pubUploadExceed,
    keyBeforeAvatarUpload,
    pubBeforeAvatarUpload,
    keyUploadError,
    pubUploadError,
    keyUploadSuccess,
    pubUploadSuccess,
    keyRemoveFile,
    pubRemoveFile,
    uploadFilePath,
    uploadHeader,
    main
}
