import  {reactive, ref, toRefs, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import { baseApi } from '@/utils/baseUrl'
import store from '@/store/index'
import  {companyMiniListApi} from '@/api/company'
import  {createMchPlatformApi} from  '@/api/paymentPlatform'


const pemUploadRef = ref(null)
const formRef = ref(null)
const uploadFilePath = `${baseApi()}admin/file/certificateUpload`
const uploadHeader = {
    'Authorization' : store.getters?.getToken
}

const state = reactive({
    fileList: [],
    companyMiniList: []
})
const newState = toRefs(state)

const formParams = reactive({
    company_id: '',
    appid: '',
    name: '',
    rsa2_key_path: '',
    remark: '',
    rsa2: ''
})

const  uploadFile = ()=> {
    if(formParams.company_id === ''){
        return  ElMessage.error({
            message: '请先选择企业',
            showClose: true
        })
    }
    pemUploadRef.value.submit()
}
const  uploadExceed = (files, fileList) => {
    ElMessage.error({
        message: '只能选择一个文件',
        showClose: true
    })
    console.log(files,fileList )
}
const  beforeAvatarUpload = (file,fileList)=> {
    const index = file.name.lastIndexOf(".");
    const suffix = file.name.substr(index+1);
    const isPem = suffix.toLowerCase() === 'pem'
    if (!isPem) {
        ElMessage.error({
            message: '只能是.pem文件',
            showClose: true
        })
        state.fileList = []
    }else {
        state.fileList = fileList
    }
    return isPem;
}
const  uploadError = (err, file, fileList) => {
    ElMessage.error({
        message: '上传文件出错',
        showClose: true
    })
    state.fileList = []
    console.log(err, file,fileList )
}

const uploadSuccess = (response, file, fileList)=>{
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
    formParams.rsa2_key_path  = response.data
    console.log(file, fileList)
}

const removeFile = (file, fileList)=> {
    state.fileList = []
    formParams.rsa2_key_path = ''
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

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createMchPlatformApi({
                pay_type_code: 'Z',
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
    pemUploadRef,
    uploadSuccess,
    removeFile,
    uploadFile,
    uploadError,
    uploadFilePath,
    uploadExceed,
    beforeAvatarUpload,
    uploadHeader,
    main
}



