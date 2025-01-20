import {reactive, toRefs, ref, onMounted} from "vue"
import  {getUserListApi, deleteUserApi} from '@/api/admin'
import {ElMessage, ElMessageBox} from "element-plus"
import {deepCopy} from "@/utils/object"
import  {getUserMenuApi} from '@/api/permissions'

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
    detail: {},
    userMenu: []
})

const getUserList = async ()=>{
    const res = await getUserListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keyword: state.keyWords
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}


const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getUserList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getUserList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getUserList()
}
const resetData = () =>{
    // state.isQuery = false
    state.keyWords = ''
    // state.companyId = ''
    state.pageIndex = 1
    getUserList()
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
        getUserList()
    }
}

//获取用户菜单
const getUserMenu = async (row) =>{
    const res = await getUserMenuApi({ad_user_id: row.id})
    if (Array.isArray(res)) {
        state.userMenu = res
        state.detail = deepCopy(row)
        state.menuDialogVisible = true

    }
}

const getUserDetail =  (row)=>{
    console.log(row)
    state.detail = reactive(deepCopy(row))
    state.updateDialogVisible = true
}

const deleteUser = async ({id})=>{
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
    const res = await  deleteUserApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getUserList()
    }
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getUserList()
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
        getUserDetail,
        updateDialogClosed,
        submitUpdate,
        deleteUser,
        submitUserMenu,
        getUserMenu,
        menuDialogClosed
    }
}

export  {
    main,
    updateChildRef,
    createChildRef,
    menuChildRef
}
