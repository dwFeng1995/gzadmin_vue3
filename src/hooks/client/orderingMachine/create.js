import { reactive, toRefs, ref, onMounted } from "vue"
import { companyMiniListApi } from '@/api/company'
import { addOrderingMachineApi, editOrderingMachineApi } from '@/api/orderingMachine'
import { ElMessage } from "element-plus"

const formRef = ref(null)
const formParams = reactive({
    client_company_id: '',
    client_no: '',
    client_name: '',
    introduce: '',
    show_type: '2',
    status: 1,
    remark: '',
})

const checkDeviceNo = (rule, value, callback) => {
    if (!value) {
        return callback(new Error('请输入设备编号'))
    } else {
        if (!/(^\d{1,3}$)/.test(value)) {
            return callback(new Error('设备编号只能是三位数字'))
        } else if (Number(value) === 0 || Number(value) > 999) {
            return callback(new Error('设备编号只能是1 - 999'))
        }
        else {
            callback()
        }
    }
}

const formRules = {
    client_company_id: [
        { required: true, message: '请选择企业', trigger: 'change' }
    ],
    client_name: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
    ],
    introduce: [
        { required: true, message: '请输入介绍语', trigger: 'blur' },
        { min: 1, max: 20, message: '介绍语长度在1~20之间', trigger: 'blur' }
    ],
    client_no: [
        { validator: checkDeviceNo, trigger: 'blur' }
    ]
}
// 编辑
const formRulesEdit = {
    client_company_id: [
        { required: true, message: '请选择企业', trigger: 'change' }
    ],
    introduce: [
        { required: true, message: '请输入介绍语', trigger: 'blur' },
        { min: 1, max: 20, message: '介绍语长度在1~20之间', trigger: 'blur' }
    ],
    client_name: [
        { required: true, message: '请输入设备名称', trigger: 'blur' }
    ],
}
const state = reactive({
    companyMiniList: []
})

// 企业列表
const getCompanyMiniList = async () => {
    const res = await companyMiniListApi()
    state.companyMiniList = res ?? []
}
const resterForm = () => {
    formRef.value.resetFields()
}

const main = ({ detail }, emit) => {
     console.log(detail,'detail',detail?.company?.id);
    const initDetail = () => {
        formParams.client_company_id = detail?.company?.id
        formParams.client_no = detail?.client_no
        formParams.client_name = detail?.client_name
        formParams.introduce = detail?.introduce
        formParams.show_type = detail?.show_type
        formParams.status = detail?.status
        formParams.remark = detail?.remark
    }
    const submitForm = () => {
        let { client_name, introduce, show_type, status, remark } = formParams
        formRef.value.validate(async valid => {
            if (!valid) {
                return
            }
            if (detail?.company) {
                const editRes = await editOrderingMachineApi(detail.id, { client_name, introduce, show_type, status, remark })
                if (editRes) {
                    ElMessage.success({
                        message: '更新成功',
                        showClose: true
                    })
                    emit('refreshData', true)
                }
            } else {
                const res = await addOrderingMachineApi(formParams)
                if (res) {
                    ElMessage.success({
                        message: '添加成功',
                        showClose: true
                    })
                    emit('refreshData', true)
                }
            }
        })
    }

    onMounted(() => {
        if (detail?.company) initDetail()

        getCompanyMiniList()

    })
    const newState = toRefs(state)
    return {
        ...newState,
        resterForm,
        submitForm
    }

}

export {
    main,
    formRef,
    formParams,
    formRulesEdit,
    formRules
}
