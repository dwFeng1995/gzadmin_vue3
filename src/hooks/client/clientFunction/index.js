import {reactive, toRefs, ref, onMounted} from "vue"
import  {getClientFunctionListApi, getClientFunctionDetailApi, deleteClientFunctionApi} from '@/api/clientFunction'
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

const getClientFunctionList = async ()=>{
    const res = await getClientFunctionListApi({
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
    getClientFunctionList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getClientFunctionList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getClientFunctionList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.pageIndex = 1
    getClientFunctionList()
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
        getClientFunctionList()
    }
}


const getClientFunctionDetail = async ({id})=>{
    const res = await getClientFunctionDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteClientFunction = async({id})=>{
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
    const res = await deleteClientFunctionApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getClientFunctionList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getClientFunctionList()
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
        getClientFunctionDetail,
        updateDialogClosed,
        submitUpdate,
        deleteClientFunction
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
