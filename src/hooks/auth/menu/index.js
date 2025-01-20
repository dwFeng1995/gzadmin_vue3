import {reactive, toRefs, ref, onMounted} from "vue"
import  {getMenuListApi, deleteMenuApi} from '@/api/menu'
import {ElMessage, ElMessageBox} from "element-plus"
import {deepCopy} from "@/utils/object"
import {menuGrouping} from '@/utils/menu'

const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    keyWords: '',
    createDialogVisible: false,
    updateDialogVisible: false,
    parentList: [
        {
            id: 0,
            order: 0,
            parent_id: 0,
            title: "ROOT",
            uri: ""
        }
    ],
    detail: {}
})

const getMenuList = async ()=>{
    const res = await getMenuListApi({keyword: state.keyWords})
    const { parent, menu} = menuGrouping( res ?? [])
    state.tableData = menu ?? []
    state.parentList = state.parentList.concat(parent ?? [])
}

const queryData = () =>{
    // state.pageIndex = 1
    getMenuList()
}
const resetData = () =>{
    state.keyWords = ''
    // state.pageIndex = 1
    getMenuList()
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
        getMenuList()
    }
}


const getMenuDetail =  (row)=>{
    console.log(row)
    state.detail = deepCopy(row)
    state.updateDialogVisible = true
}

const deleteMenu = async ({id})=>{
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
    const res = await  deleteMenuApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getMenuList()
    }
}

const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getMenuList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        createDialogClosed,
        submitCreate,
        refreshData,
        getMenuDetail,
        updateDialogClosed,
        submitUpdate,
        deleteMenu
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
