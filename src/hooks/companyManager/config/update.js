import {reactive, ref, onMounted,} from "vue"
import store from '@/store/index'
import { baseApi } from '@/utils/baseUrl'
import { ElMessage } from "element-plus"
import  {updateAdminConfigApi} from '@/api/adminConfig'
const formRef = ref(null)

const formParams =  reactive({
    name: '',
    en_name: '',
    logo: '',
    synopsis: '',
    is_on: 1,
    title: '',
    summary: '',
    icp: ''
})

const getIcpConetnt = (content)=>{
    formParams.icp = content
    console.log('content',content)
}
const getSynopsisContent = (content)=>{
    formParams.synopsis = content
    console.log('content',content)
}
const formRules = {
    name: [
        {
            required: true,
            message: '名称不能为空',
            trigger: 'blur',
        }
    ],
    en_name: [
        {
            required: true,
            message: '英文名不能为空',
            trigger: 'blur',
        }
    ],
    title: [
        {
            required: true,
            message: '大标题不能为空',
            trigger: 'blur',
        }
    ],
    icp: [
        {
            required: true,
            message: 'icp不能为空',
            trigger: 'blur',
        }
    ],
    logo: [
        {
            required: true,
            message: '请上传logo',
            trigger: 'blur',
        }
    ]
}
const beforeAvatarUpload = (file)=>{
    console.log('file',file)
}
const handleAvatarSuccess = (res, file) =>{
    if(res.sub_code === 'SUCCESS') {
        ElMessage.success({
            message: '上传成功',
            showClose: true
        })
        formParams.logo = res?.data[0]
    }else {
        ElMessage.error({
            message: `${res.msg}`,
            showClose: true
        })
    }
    console.log('res',res)
    console.log('file',file)
}
const handleAvatarError = (err, file, fileLis)=>{
    console.error('err',err,file,fileLis)
}
const uploadHeaders = reactive({
    Authorization : store.getters?.getToken
})

const resetForm = ()=>{
    formRef.value.resetFields()
}


const main = (props, emit)=>{
    console.log('props',props)
    console.log('emit',emit)
    // const  primaryKey = props?.detail?.id
    // formParams.synopsis = props?.detail?.synopsis
    // formParams.name = props?.detail?.name
    // formParams.en_name = props?.detail?.en_name
    // formParams.logo = props?.detail?.logo
    // formParams.is_on = props?.detail?.is_on
    // formParams.title = props?.detail?.title
    // formParams.summary = props?.detail?.summary
    // formParams.icp = props?.detail?.icp
    let   primaryKey = ''
    const initDetail = ()=>{
        primaryKey = props?.detail?.id
        formParams.synopsis = props?.detail?.synopsis
        formParams.name = props?.detail?.name
        formParams.en_name = props?.detail?.en_name
        formParams.logo = props?.detail?.logo
        formParams.is_on = props?.detail?.is_on
        formParams.title = props?.detail?.title
        formParams.summary = props?.detail?.summary
        formParams.icp = props?.detail?.icp
    }
    console.log('props?.detail?.icp',props?.detail?.icp)
    const submitForm =  ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await updateAdminConfigApi(formParams, primaryKey)
            if(res === true || res>=0) {
                ElMessage.success({
                    message: '更新成功',
                    showClose: true
                })
                emit('refreshData',true)
            }else {
                console.log('res',res)
            }
        })
    }
    onMounted(()=>{
        initDetail()
    })
    return {
        submitForm
    }
}



const uploadPath = `${baseApi()}admin/company/configUploadLogo/`

export {
    formParams,
    formRef,
    getIcpConetnt,
    getSynopsisContent,
    formRules,
    beforeAvatarUpload,
    handleAvatarSuccess,
    handleAvatarError,
    uploadHeaders,
    uploadPath,
    resetForm,
    main,
}
