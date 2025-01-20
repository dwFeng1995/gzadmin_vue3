import {getCompanyClientFunListApi, companyClientFunDetailApi, deleteCompanyClientFunApi } from '@/api/companyClientFun'
import  {companyMiniListApi} from '@/api/company'
import  {clientFunctionInfoAllApi} from '@/api/clientFunctionInfo'
import { reactive, toRefs, onMounted, ref } from "vue"
import {ElMessage, ElMessageBox} from "element-plus";

const createChildRef = ref(null)
const updateChildRef = ref(null)
const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    companyId: '',
    clientFunInfoId: '',
    companyMiniList: [],
    clientFunctionInfoMiniList: [],
    createDialogVisible: false,
    updateDialogVisible: false,
    detail: {}
})

const main =()=>{
    const newState = toRefs(state)
    const getCompanyClientFunList =  async ()=>{
        const res = await getCompanyClientFunListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            client_fun_info_id : state.clientFunInfoId,
            company_id: state.companyId
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCompanyClientFunList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCompanyClientFunList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getCompanyClientFunList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.clientFunInfoId = ''
        state.companyId = ''
        state.pageIndex = 1
        getCompanyClientFunList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.clientFunInfoId = ''
            state.companyId = ''
        }
    }
    const getCompanyMiniList = async ()=>{
        const res = await  companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const getClientFunctionInfoMiniList = async ()=>{
        const res = await clientFunctionInfoAllApi()
        state.clientFunctionInfoMiniList = res ?? []
    }
    const createDialogClosed = ()=>{
        createChildRef.value.resetForm()
    }
    const updateDialogClosed = ()=>{
        updateChildRef.value.resetForm()
    }
    const getDetail = async ({id})=>{
        const res = await companyClientFunDetailApi(id)
        const length = Object.keys(res ?? {}).length
        if(length >0) {
            state.detail = res
            state.updateDialogVisible = true
        }
        console.log('res',res)
    }
    onMounted(()=>{
        getCompanyClientFunList()
        getCompanyMiniList()
        getClientFunctionInfoMiniList()
    })
    const refreshData = (flag)=>{
        state.createDialogVisible = false
        state.updateDialogVisible = false
        if(flag === true) {
            getCompanyClientFunList()
        }
    }
    const submitCreate = ()=>{
        createChildRef.value.submitForm()
    }
    const submitUpdate = ()=>{
        updateChildRef.value.submitForm()
    }
    const deleteCompanyClientFun =  async ({id})=>{
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
        const res = await deleteCompanyClientFunApi(id)
        if(Number(res) >0) {
            ElMessage.success({
                message: '删除成功',
                showClose: true
            })
            getCompanyClientFunList()
        }else {
            ElMessage.error({
                message: '删除失败',
                showClose: true
            })
        }
    }
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        createDialogClosed,
        updateDialogClosed,
        refreshData,
        submitCreate,
        submitUpdate,
        getDetail,
        deleteCompanyClientFun
    }
}

export {
    main,
    createChildRef,
    updateChildRef,
}
