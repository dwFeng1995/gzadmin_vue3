import {getLogCanteenClientStoreListApi} from '@/api/logCanteenClientStore'
import {reactive, toRefs, onMounted, ref} from  "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {allClientTypeApi} from '@/api/clientType'

const createChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    canteenMiniList: [],
    clientTypeMiniList: [],
    clientType: '',
    canteenId: '',
    createDialogVisible: false
})

const getLogCanteenClientStoreList = async ()=>{
    const res = await getLogCanteenClientStoreListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        client_type: state.clientType,
        canteen_id: state.canteenId
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getLogCanteenClientStoreList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getLogCanteenClientStoreList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getLogCanteenClientStoreList()
}
const resetData = () =>{
    state.isQuery = false
    state.canteenId = ''
    state.clientType = ''
    state.pageIndex = 1
    getLogCanteenClientStoreList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
        state.canteenId = ''
        state.clientType = ''
    }
}
const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
}
const getCanteenMiniList = async ()=>{
    const res = await getCanteenMiniListApi()
    state.canteenMiniList = res ?? []
}

const createDialogClosed = ()=>{
    createChildRef.value.resetForm()
}

const submitCreate = ()=>{
    createChildRef.value.submitForm()
}

const refreshData = (flag)=>{
    state.createDialogVisible = false
    if (flag) {
        getLogCanteenClientStoreList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getLogCanteenClientStoreList()
        getClientTypeMiniList()
        getCanteenMiniList()
    })
    return {
        ...newState,
        changePageIndex,
        changePageSize,
        resetData,
        queryData,
        createDialogClosed,
        submitCreate,
        refreshData
    }
}

export  {
    main,
    createChildRef
}
