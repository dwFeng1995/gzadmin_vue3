import { reactive, toRefs, onMounted, ref } from "vue"
import { getCanteenMiniListApi } from '@/api/canteen'
import { companyMiniListApi } from '@/api/company'
import { allClientTypeApi } from '@/api/clientType'
import { getCanteenClientListApi } from '@/api/canteenClient'
import {addActivationCodeApi} from '@/api/clientActivationCode.js'
import { ElMessage } from "element-plus"

const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    keyWords: '',
    isQuery: false,
    canteenMiniList: [],
    companyMiniList: [],
    clientTypeMiniList: [],
    clientTypeId: '',
    canteenId: '',
    companyId: '',
    multipleSelectionId: []
})

const main = (emit) => {
    const getCanteenMiniList = async () => {
        const res = await getCanteenMiniListApi()
        state.canteenMiniList = res ?? []
    }
    const getCompanyMiniList = async () => {
        const res = await companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const getClientTypeMiniList = async () => {
        const res = await allClientTypeApi()
        state.clientTypeMiniList = res ?? []
    }

    const getCanteenClientList = async () => {
        const res = await getCanteenClientListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            canteen_id: state.canteenId,
            company_id: state.companyId,
            client_type_id: state.clientTypeId,
            keyword: state.keyWords
        })
        state.tableData = res?.data ?? []
        state.pageTotal = res?.total
    }

    const handleSelectionChange = (val) => {
        state.multipleSelectionId = val.map(x => x.id)
    }

    const submitCrate=async ()=>{
        if(!state.multipleSelectionId.length) return ElMessage.warning({ message: '请选择激活码',showClose: true})
        const res=await addActivationCodeApi({client_ids:state.multipleSelectionId.join(',')})
        if (res) {
            ElMessage.success({
                message: '更新成功！',
                showClose: true
            })
            emit('refreshData')
        }
    }

    onMounted(() => {
        getCanteenClientList()
        getCanteenMiniList()
        getCompanyMiniList()
        getClientTypeMiniList()
    })

    const changePageSize = (newPageSize) => {
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCanteenClientList()
    }
    const changePageIndex = (newPageIndex) => {
        isClickQuery()
        state.pageIndex = newPageIndex
        getCanteenClientList()
    }
    const queryData = () => {
        state.isQuery = true
        state.pageIndex = 1
        getCanteenClientList()
    }
    const resetData = () => {
        state.isQuery = false
        state.canteenId = ''
        state.companyId = ''
        state.clientTypeId = ''
        state.pageIndex = 1
        state.keyWords = ''
        getCanteenClientList()
    }
    const isClickQuery = () => {
        if (!state.isQuery) {
            state.canteenId = ''
            state.companyId = ''
            state.clientTypeId = ''
            state.keyWords = ''
        }
    }
    

    const newState = toRefs(state)
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        handleSelectionChange,
        submitCrate
    }
}
export {
    main,
    createChildRef,
    updateChildRef
}
