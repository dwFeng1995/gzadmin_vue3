import {reactive, toRefs, ref, onMounted} from "vue"
import  {getClientModelListApi, getClientModelDetailApi, deleteClientModelApi} from '@/api/clientModel'
import {ElMessage, ElMessageBox} from "element-plus"
import  {allClientTypeApi} from '@/api/clientType'

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
    detail: {},
    clientTypeMiniList: [],
    funTypeId: ''
})

const getClientModelList = async ()=>{
    const res = await getClientModelListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords,
        fun_type_id: state.funTypeId
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getClientModelList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getClientModelList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getClientModelList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.funTypeId = ''
    state.pageIndex = 1
    getClientModelList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
        state.keyWords = ''
        state.funTypeId = ''
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
        getClientModelList()
    }
}

const getClientModelDetail = async ({id})=>{
    const res = await getClientModelDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteClientModel = async({id})=>{
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
  await deleteClientModelApi(id)
    ElMessage.success({
        message: '删除成功！',
        showClose: true
    })
    getClientModelList()

}
const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getClientModelList()
        getClientTypeMiniList()
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
        getClientModelDetail,
        updateDialogClosed,
        submitUpdate,
        deleteClientModel
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
