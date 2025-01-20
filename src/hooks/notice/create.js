import { reactive, toRefs, onMounted, ref } from "vue"
import { updatePromptApi } from '@/api/notice'
import { ElMessage } from "element-plus"
const formRef = ref(null)
const state = reactive({
    formParams: {
        synopsis: '',
        ectypalStatus: '',
        enable: 0,
        base64Url: '',
    },
    formRules: {
        synopsis: [
            {
                required: true,
                message: '提示语不能为空',
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
})

export const main = ({ Info: { id, enable, data, code } }, emit) => {
    /* 图片 */
    const showimg = (e) => {
        var path = e.target.files[0].name
        var fix = path.substr(path.lastIndexOf('.'));
        var lowFix = fix.toLowerCase();
        if (lowFix !== '.jpg') return ElMessage.warning({ message: '请上传jpg格式图片', showClose: true })
        previewFile(e.target.files)
    }
    const previewFile = (files) => {
        console.log(files, 'files');
        if (files.length == 1) {
            // 创建流对象
            let reader = new FileReader()
            reader.readAsDataURL(files[0])
            // 捕获 转换完毕
            reader.onload = function (e) {
                state.formParams.base64Url = e.target.result
                state.formParams.ectypalStatus = e.target.result
            }
        }
    }
    const imgClick = () => {
        document.getElementById("uploadFile").click();
    }

    /*  编辑器 */

    // 获取简介值
    const getSynopsisContent = (content) => {
        state.formParams.synopsis = content
    }

    // 重置
    const resetForm = () => {
        formRef.value.resetFields()
    }

    // 检验规则
    const submitForm = () => {
        formRef.value.validate(async valid => {
            if (!valid) return
            const parameter = {
                data: state.formParams.synopsis,
                enable: state.formParams.enable
            }
            const res = updatePromptApi(parameter, id)
            try {
                emit('refreshData')
                ElMessage.success({
                    message: '编辑成功',
                    showClose: true
                })
            } catch {
                console.log(res);
            }
        })

    }

    const initDetail = () => {
        if (code == 'ADMIN') {
            state.formParams.base64Url = data
        } else if (code == 'H5') {
            state.formParams.synopsis = data
        }
        console.log(state.formParams.synopsis);
        state.formParams.enable = enable ? 1 : 0
        state.formParams.ectypalStatus = ''

    }
    // 提交
    const submitUpdate = async () => {
        if (code == 'ADMIN') {
            const parameter = {
                data: state.formParams.ectypalStatus ? state.formParams.base64Url : undefined,
                enable: state.formParams.enable
            }
            const res = updatePromptApi(parameter, id)
            try {
                emit('refreshData')
                ElMessage.success({
                    message: '编辑成功',
                    showClose: true
                })
            } catch {
                console.log(res);
            }
        } else {
            submitForm()
        }
    }

    onMounted(() => {
        initDetail()
    })
    return {
        ...toRefs(state),
        showimg,
        imgClick,
        submitUpdate,
        getSynopsisContent,
        resetForm,
        submitForm,
        formRef
    }

}


