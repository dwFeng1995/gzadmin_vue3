import {reactive, toRefs, ref, onMounted} from "vue"
import  {getAdminPermissionsListApi, deleteAdminPermissionsApi} from '@/api/adminPermissions'
import {ElMessage, ElMessageBox} from "element-plus"
import {deepCopy} from "@/utils/object"
import handelRouter from '@/hooks/adminPermissions/permissions/handelRouter'

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


const getAdminPermissionsList = async ()=>{
    const res = await getAdminPermissionsListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        name: state.keyWords
    })
    state.tableData = res?.data.map(item=>Object.assign(item,{
        http_path: handelRouter(item.http_path)
    }))
    state.pageTotal = res?.total
}




const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getAdminPermissionsList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getAdminPermissionsList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getAdminPermissionsList()
}
const resetData = () =>{
    // state.isQuery = false
    state.keyWords = ''
    // state.companyId = ''
    state.pageIndex = 1
    getAdminPermissionsList()
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
        getAdminPermissionsList()
    }
}


const getPermissionsDetail =  (row)=>{
    console.log(row)
    state.detail = reactive(deepCopy(row))
    state.updateDialogVisible = true
}

const deleteAdminPermissions = async ({id})=>{
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
    const res = await  deleteAdminPermissionsApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getAdminPermissionsList()
    }
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getAdminPermissionsList()
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
        getPermissionsDetail,
        updateDialogClosed,
        submitUpdate,
        deleteAdminPermissions
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
