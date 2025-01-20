import {reactive, toRefs, ref, onMounted} from "vue"
import  {getNutrimentCusListApi, getNutrimentCusDetailApi, deleteNutrimentCusApi} from '@/api/nutrimentCus'
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
    companyId: '',
    companyMiniList: []
})

const getNutrimentCusList = async ()=>{
    const res = await getNutrimentCusListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords,
        company_id: state.companyId
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList  = res ?? []
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getNutrimentCusList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getNutrimentCusList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getNutrimentCusList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.companyId = ''
    state.pageIndex = 1
    getNutrimentCusList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
        state.companyId = ''
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
        getNutrimentCusList()
    }
}


const getNutrimentCusDetail = async ({id})=>{
    const res = await getNutrimentCusDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteNutrimentCus = async({id})=>{
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
    const res = await deleteNutrimentCusApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getNutrimentCusList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getNutrimentCusList()
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
        getNutrimentCusDetail,
        updateDialogClosed,
        submitUpdate,
        deleteNutrimentCus
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
