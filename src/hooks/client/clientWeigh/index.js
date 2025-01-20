import {reactive, toRefs, ref, onMounted} from "vue"
import  {getClientWeighListApi, updateClientWeighStatusApi, getClientWeighDetailApi, deleteClientWeighApi} from '@/api/clientWeigh'
import {getCanteenMiniListApi} from '@/api/canteen'
import {ElMessage, ElMessageBox} from "element-plus"

const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    canteenMiniList: [],
    canteenId: '',
    keyWords: '',
    createDialogVisible: false,
    updateDialogVisible: false,
    detail: {}
})

const getCanteenMiniList = async ()=>{
    const res = await getCanteenMiniListApi()
    state.canteenMiniList = res ?? []
}
const getClientWeighList = async ()=>{
    const res = await getClientWeighListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords,
        canteen_id: state.canteenId
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getClientWeighList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getClientWeighList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getClientWeighList()
}
const resetData = () =>{
    state.isQuery = false
    state.canteenId = ''
    state.keyWords = ''
    state.pageIndex = 1
    getClientWeighList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
        state.canteenId = ''
        state.keyWords = ''
    }
}

const createDialogClosed = ()=>{
    createChildRef.value.resterForm()
}
const submitCreate = ()=>{
    createChildRef.value.submitForm()
}

const updateDialogClosed = ()=>{
    updateChildRef.value.resterForm()
}
const submitUpdate = ()=>{
    updateChildRef.value.submitForm()
}
const  refreshData = (flag)=>{
    state.createDialogVisible = false
    state.updateDialogVisible = false
    if (flag) {
        getClientWeighList()
    }
}
const updateCabinetStatus = async ({id})=>{
    const res = await  updateClientWeighStatusApi(id)
    if(res) {
        ElMessage.success({
            message: '更新成功！',
            showClose: true
        })
    }
    getClientWeighList()
}

const getCabinetDetail = async ({id})=>{
    const res = await getClientWeighDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteCabinet = async({id})=>{
    const resultConfim =  await ElMessageBox.confirm(
        '是否删除这条记录?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).catch(err=>err)
    if(resultConfim !== 'confirm') {
        return  ElMessage.info({
            message: '已取消删除',
            showClose: true
        })
    }
    const res = await deleteClientWeighApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getClientWeighList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getClientWeighList()
        getCanteenMiniList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        updateCabinetStatus,
        createDialogClosed,
        submitCreate,
        refreshData,
        getCabinetDetail,
        updateDialogClosed,
        submitUpdate,
        deleteCabinet
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
