import { reactive, toRefs, onMounted, ref } from 'vue'
import { getClientPaySourceMiniApi, editClientPaySourceApi } from '@/api/clientTypeRelevancy.js'
import { deepCopy } from "@/utils/object"
import { ElMessage } from "element-plus"
const formRef = ref(null)
const state = reactive({
    clientModelMiniList: [],
    formParams: {
        checkedPattern: [],
    },
})

const formRules = {
    checkedPattern: [
        {
            type: 'array',
            required: true,
            message: '至少选择一个设备模式',
            trigger: 'change',
        },
    ],
}


export const main = ({ detail }, emit) => {
    const getClientModelMiniList = async () => {
        const res = await getClientPaySourceMiniApi()
        state.clientModelMiniList = deepCopy(res ?? []).map(x => Object.assign(x, { checked: false }))
        detail.pay_source.forEach(x => state.clientModelMiniList.forEach(x1 => { if (x.id == x1.id) return x1.checked = true }));
        state.formParams.checkedPattern = state.clientModelMiniList.filter(x => x.checked).map(x1 => x1.id)
    }

    const resterForm = () => {
        formRef.value.resetFields()
    }

    const updateSubmitForm = () => {
        formRef.value.validate(async valid => {
            if (!valid) return
            const res =await editClientPaySourceApi(detail.id, { pay_source_id: state.formParams.checkedPattern })
            if (res) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData')

            }
        })
    }

    onMounted(() => {
        getClientModelMiniList()
    })

    return {
        ...toRefs(state),
        updateSubmitForm,
        resterForm,
        formRef,
        formRules
    }
}