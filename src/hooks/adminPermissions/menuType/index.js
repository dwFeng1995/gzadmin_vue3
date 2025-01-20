import {reactive, toRefs, ref, onMounted} from "vue"
import  {getAdminMenuTypeListApi, deleteAdminMenuTypeApi} from '@/api/adminMenuType'
import {ElMessage, ElMessageBox} from "element-plus"
import {deepCopy} from "@/utils/object"


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


const getAdminMenuTypeList = async ()=>{
    const res = await getAdminMenuTypeListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        name: state.keyWords
    })
    state.tableData = res
    // state.tableData = res?.data
    // state.pageTotal = res?.total
}




const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getAdminMenuTypeList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getAdminMenuTypeList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getAdminMenuTypeList()
}
const resetData = () =>{
    // state.isQuery = false
    state.keyWords = ''
    // state.companyId = ''
    state.pageIndex = 1
    getAdminMenuTypeList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
        // state.companyId = ''
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
        getAdminMenuTypeList()
    }
}


const getAdminMenuType =  (row)=>{
    state.detail = deepCopy(row)
    state.updateDialogVisible = true
}

const deleteAdminMenuType = async ({id})=>{
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
    const res = await  deleteAdminMenuTypeApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getAdminMenuTypeList()
    }
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getAdminMenuTypeList()
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
        getAdminMenuType,
        updateDialogClosed,
        submitUpdate,
        deleteAdminMenuType
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
