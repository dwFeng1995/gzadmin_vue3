import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import { baseApi } from '@/utils/baseUrl'
import store from '@/store/index'
import  {companyMiniListApi} from '@/api/company'
import  {updateMchPlatformApi} from  '@/api/paymentPlatform'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const keyUploadRef = ref(null)
const pubUploadRef = ref(null)
const formParams = reactive({
    id: '',
    company_id: '',
    appid: '',
    name: '',
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
    formRef.value.resetFields()
}

const  initDetail = async (props)=>{
    console.log('props', props)
    await getCompanyMiniList()
    formParams.id = props?.detail?.id
    formParams.company_id = props?.detail?. company_id
    formParams.appid = props?.detail?.appid
    formParams.name = props?.detail?.name
    formParams.mch_id =  props?.detail?. mch_id
    formParams.cert_path = props?.detail?.cert_path
    formParams.key_path = props?.detail?.key_path
    formParams.remark = props?.detail?.remark
    formParams.key = props?.detail?.key
    formParams.app_sert = props?.detail?.app_sert
    formParams.template_id = props?.detail?.template_id
    formParams.template_cabinet = props?.detail?.template_cabinet
    formParams.template_mini_order = props?.detail?.template_mini_order
    formParams.template_call = props?.detail?.template_call
    formParams.url_h5 = props?.detail?.url_h5
}

const main = (props,emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateMchPlatformApi({
                pay_type_code: 'W',
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
