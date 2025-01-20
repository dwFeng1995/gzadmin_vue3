import { reactive, toRefs, onMounted, ref } from 'vue'
import { getClientTypeRelevancyApi } from '@/api/clientTypeRelevancy.js'
const updateChildRef = ref(null)
const state = reactive({
    tableData: [],
    keyWords: '',
    updateDialogVisible: false,
    detail: {}
})

export const main = () => {
    const getgetClientTypeRelevancy = async () => {
        const res = await getClientTypeRelevancyApi({ keywords: state.keyWords })
        state.tableData = res ?? []
    };
    const queryData = () => {
        getgetClientTypeRelevancy()
    };

    const resetData = () => {
        state.keyWords = '';
        getgetClientTypeRelevancy();
    };

    const getClientDetail = (row) => {
        state.detail = row
        state.updateDialogVisible = true
    };

    const updateDialogClosed = () => {
        updateChildRef.value.resterForm()
    };

    const submitUpdate = () => {
        updateChildRef.value.updateSubmitForm()
    };

    const refreshData = () => {
        state.updateDialogVisible = false
        getgetClientTypeRelevancy()
    };


    onMounted(() => {
        getgetClientTypeRelevancy()
    })


    return {
        ...toRefs(state),
        queryData,
        resetData,
        getClientDetail,
        updateDialogClosed,
        submitUpdate,
        refreshData,
        updateChildRef,
    }
}
