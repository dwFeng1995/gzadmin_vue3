import {reactive, toRefs, ref, onMounted} from "vue"
import  {getAdminMenuListApi, deleteAdminMenuApi, getAdminMenuDetailApi} from '@/api/adminMenu'
import {ElMessage, ElMessageBox} from "element-plus"
// import {deepCopy} from "@/utils/object"
import {menuGrouping} from '@/utils/menu'

const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    isQuery: false,
    keyWords: '',
    createDialogVisible: false,
    updateDialogVisible: false,
    detail: {},
    parentList: [
        {
            id: 0,
            parent_id: 0,
            name: 'ROOT',
            title: 'ROOT'
        }
    ]
})

const getAdminMenuList = async ()=>{
    const res = await getAdminMenuListApi({title: state.keyWords})
    const {menu, parent} = menuGrouping( res ?? [])
    state.tableData = menu ?? []
    state.parentList =  state.parentList.concat(parent ?? [])
    console.log('parent',parent)
    console.log(state.tableData)
}



const queryData = () =>{
    state.isQuery = true
    getAdminMenuList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.pageIndex = 1
    getAdminMenuList()
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
        getAdminMenuList()
    }
}


const getAdminMenuDetail = async ({id})=>{
    const res = await getAdminMenuDetailApi({admin_menu_id: id})
    if (Object.keys(res ?? {}).length > 0) {
        state.detail = res
        state.updateDialogVisible = true
    }

}

const deleteAdminMenu = async ({id})=>{
    const resultConfim =  await ElMessageBox.confirm(
        '是否删除此菜单?',
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
    const res = await  deleteAdminMenuApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getAdminMenuList()
    }
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getAdminMenuList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        createDialogClosed,
        submitCreate,
        refreshData,
        getAdminMenuDetail,
        updateDialogClosed,
        submitUpdate,
        deleteAdminMenu
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
