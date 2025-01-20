import {reactive, toRefs, ref, onMounted} from "vue"
import  {getOrderingMachineListApi,editOrderingMachineApi,deleteOrderingMachineApi} from '@/api/orderingMachine'
import  {companyMiniListApi} from '@/api/company'
import {ElMessage,ElMessageBox} from "element-plus"

const createChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    companyMiniList: [],
    companyId: '',
    keyWords: '',
    createDialogVisible: false,
    updateDialogVisible:false,
    detail: {}
})
// 企业列表
const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList = res ?? []
}
// 竖屏机列表
const getOrderingMachineListData = async ()=>{
    const res = await getOrderingMachineListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords,
        company_id: state.companyId
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}
// 页码/条数
const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getOrderingMachineListData()
}
// 页码/页数
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getOrderingMachineListData()
}
// 查询
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getOrderingMachineListData()
}
// 刷新
const resetData = () =>{
    state.isQuery = false
    state.canteenId = ''
     state.companyId=''
    state.keyWords = ''
    state.pageIndex = 1
    getOrderingMachineListData()
    
    
}
// 数据重置
const isClickQuery = ()=>{
    if(!state.isQuery) {
        state.canteenId = ''
        state.keyWords = ''
    }
}

const handleAdd=()=>{
   
    state.detail={}
    state.createDialogVisible=true
}

const createDialogClosed = ()=>{
    createChildRef.value.resterForm()
}
const submitCreate = ()=>{
    createChildRef.value.submitForm()
}

const  refreshData = (flag)=>{
    state.createDialogVisible = false
    if (flag) {
        getOrderingMachineListData()
    }
}
const updateCabinetStatus = async ({id,status})=>{
    console.log(status,'status');
    const res = await  editOrderingMachineApi(id,{status})
    if(res) {
        ElMessage.success({
            message: '更新成功！',
            showClose: true
        })
        getOrderingMachineListData()
    }
    
}

const getCabinetDetail = async (row)=>{
    state.detail = row
    state.createDialogVisible = true
   
    // const res = await getClientWeighDetailApi(id)
    // const length = Object.keys(res ?? {}).length
    // if (length>0) {
    //     state.detail = res
    // }
    // console.log(id)
}

const deleteCabinet = async({id})=>{
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
    const res = await deleteOrderingMachineApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
         getOrderingMachineListData()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getCompanyMiniList()
        getOrderingMachineListData()
    })
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        createDialogClosed,
        getCabinetDetail,
        submitCreate,
        refreshData,
        handleAdd,
        updateCabinetStatus,
        deleteCabinet
    }
}

export  {
    main,
    createChildRef
}
