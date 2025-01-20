import {reactive, toRefs, ref, onMounted} from "vue"
import  {getClientFunctionInfoListApi, getClientFunctionInfoDetailApi, deleteClientFunctionInfoApi} from '@/api/clientFunctionInfo'
import {ElMessage, ElMessageBox} from "element-plus"

const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    keyWords: '',
    createDialogVisible: false,
    updateDialogVisible: false,
    detail: {}
})

const getClientFunctionInfoList = async ()=>{
    const res = await getClientFunctionInfoListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getClientFunctionInfoList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getClientFunctionInfoList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getClientFunctionInfoList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.pageIndex = 1
    getClientFunctionInfoList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
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
        getClientFunctionInfoList()
    }
}


const getClientFunctionInfoDetail = async ({id})=>{
    const res = await getClientFunctionInfoDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteClientFunctionInfo = async({id})=>{
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
    const res = await deleteClientFunctionInfoApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getClientFunctionInfoList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getClientFunctionInfoList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        createDialogClosed,
        submitCreate,
        refreshData,
        getClientFunctionInfoDetail,
        updateDialogClosed,
        submitUpdate,
        deleteClientFunctionInfo
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
