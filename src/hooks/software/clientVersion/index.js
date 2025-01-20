import {reactive, toRefs, ref, onMounted} from "vue"
import  {getClintSoftVersionListApi, deleteClintSoftVersionApi} from '@/api/software/clientVersion'
import {ElMessage, ElMessageBox} from "element-plus"
import {deepCopy} from "@/utils/object"
import  {allClientTypeApi} from '@/api/clientType'

const createChildRef = ref(null)
const updateChildRef = ref(null)
const menuChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    keyWords: '',
    createDialogVisible: false,
    updateDialogVisible: false,
    menuDialogVisible: false,
    clientTypeMiniList: [],
    clientType: '',
    detail: {}
})

const getClintSoftVersionList = async ()=>{
    const res = await getClintSoftVersionListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keyword: state.keyWords,
        client_type: state.clientType
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}


const getClientTypeMiniList = async ()=>{
    const res  = await allClientTypeApi()
    state.clientTypeMiniList = res ?? []
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getClintSoftVersionList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getClintSoftVersionList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getClintSoftVersionList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.clientType = ''
    // state.companyId = ''
    state.pageIndex = 1
    getClintSoftVersionList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
        // state.companyId = ''
        state.clientType = ''
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

const  submitUserMenu = ()=>{
    menuChildRef.value.submitForm()
}

const menuDialogClosed = ()=>{
    menuChildRef.value.resterForm()
}

const  refreshData = (flag)=>{
    state.createDialogVisible = false
    state.updateDialogVisible = false
    state.menuDialogVisible = false
    if (flag) {
        getClintSoftVersionList()
    }
}


const getClintSoftVersion =  (row)=>{
    console.log(row)
    state.detail = deepCopy(row)
    state.updateDialogVisible = true
}

const deleteClintSoftVersion = async ({id})=>{
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
    const res = await  deleteClintSoftVersionApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getClintSoftVersionList()
    }
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getClintSoftVersionList()
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
        getClintSoftVersion,
        updateDialogClosed,
        submitUpdate,
        deleteClintSoftVersion,
        submitUserMenu,
        menuDialogClosed
    }
}

export  {
    main,
    updateChildRef,
    createChildRef,
    menuChildRef
}
