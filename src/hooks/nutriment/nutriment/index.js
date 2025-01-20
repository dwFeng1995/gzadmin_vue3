import {reactive, toRefs, ref, onMounted} from "vue"
import  {getNutrimentListApi, getNutrimentDetailApi, deleteNutrimentApi} from '@/api/nutriment'
import  {companyMiniListApi} from '@/api/company'
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
    detail: {},
    // companyId: '',
    companyMiniList:  [
        {
            id: 0,
            company_name: '所有人可见'
        }
    ]
})

const getNutrimentList = async ()=>{
    const res = await getNutrimentListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords,
        // company_id: state.companyId
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList  = state.companyMiniList.concat(res ?? [])
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getNutrimentList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getNutrimentList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getNutrimentList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.companyId = ''
    state.pageIndex = 1
    getNutrimentList()
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
        getNutrimentList()
    }
}


const getNutrimentDetail = async ({id})=>{
    const res = await getNutrimentDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteNutriment = async({id})=>{
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
    const res = await deleteNutrimentApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getNutrimentList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getNutrimentList()
        getCompanyMiniList()
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
        getNutrimentDetail,
        updateDialogClosed,
        submitUpdate,
        deleteNutriment
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
