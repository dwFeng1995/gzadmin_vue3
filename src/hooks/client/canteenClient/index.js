import {reactive, toRefs, onMounted, ref} from  "vue"
import {getCanteenMiniListApi} from '@/api/canteen'
import  {companyMiniListApi} from '@/api/company'
import  {allClientTypeApi} from '@/api/clientType'
import  {getCanteenClientListApi, updateClientDefaultApi, updateClientStatusApi, deleteCanteenClientApi, getCanteenClientDetailApi} from '@/api/canteenClient'
import {ElMessage, ElMessageBox} from "element-plus"

const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    keyWords: '',
    isQuery: false,
    canteenMiniList: [],
    companyMiniList: [],
    clientTypeMiniList: [],
    clientTypeId: '',
    canteenId: '',
    companyId: '',
    createDialogVisible: false,
    updateDialogVisible: false,
    detail: {}
})

const main =()=> {
    const getCanteenMiniList = async ()=>{
        const res = await getCanteenMiniListApi()
        state.canteenMiniList = res ?? []
    }
    const getCompanyMiniList = async ()=>{
        const res = await  companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const getClientTypeMiniList = async ()=>{
        const res  = await allClientTypeApi()
        state.clientTypeMiniList = res ?? []
    }

    const getCanteenClientList = async ()=>{
        const res = await getCanteenClientListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            canteen_id: state.canteenId,
            company_id: state.companyId,
            client_type_id: state.clientTypeId,
            keyword: state.keyWords
        })
        state.tableData = res?.data ?? []
        state.pageTotal = res?.total
    }
   const updateClientDefault = async ({id}) =>{
        const res = await updateClientDefaultApi(id)
       if(res) {
           ElMessage.success({
               message: '更新成功！',
               showClose: true
           })
       }
       getCanteenClientList()
   }
    const updateClientStatus = async ({id})=>{
        const res = await updateClientStatusApi(id)
        if(res) {
            ElMessage.success({
                message: '更新成功！',
                showClose: true
            })
        }
        getCanteenClientList()
    }
    onMounted(()=>{
        getCanteenClientList()
        getCanteenMiniList()
        getCompanyMiniList()
        getClientTypeMiniList()
    })

    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCanteenClientList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCanteenClientList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getCanteenClientList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.canteenId = ''
        state.companyId = ''
        state.clientTypeId = ''
        state.pageIndex = 1
        state.keyWords = ''
        getCanteenClientList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.canteenId = ''
            state.companyId = ''
            state.clientTypeId = ''
            state.keyWords = ''
        }
    }
    const createDialogClosed = ()=>{
        createChildRef.value.resterForm()
    }
    const updateDialogClosed = ()=>{
        updateChildRef.value.resterForm()
    }
    const submitCreate = ()=>{
        createChildRef.value.submitForm()
    }
    const submitUpdate = ()=>{
        updateChildRef.value.submitForm()
    }
    const  refreshData = (flag)=>{
        state.createDialogVisible = false
        state.updateDialogVisible = false
        if (flag) {
            getCanteenClientList()
        }
    }
    const deleteCanteenClient = async ({id})=>{
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
        const res = await deleteCanteenClientApi(id)
        if(res) {
            ElMessage.success({
                message: '删除成功！',
                showClose: true
            })
        }
        getCanteenClientList()
    }
    const getCanteenClientDetail = async ({id})=>{
        const res =  await getCanteenClientDetailApi(id)
        const length = Object.keys(res ?? {}).length
        if(length >0) {
            state.detail = res
            state.updateDialogVisible = true
        }
    }


    const newState = toRefs(state)
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        updateClientDefault,
        updateClientStatus,
        createDialogClosed,
        submitCreate,
        refreshData,
        deleteCanteenClient,
        getCanteenClientDetail,
        updateDialogClosed,
        submitUpdate
    }
}
export  {
    main,
    createChildRef,
    updateChildRef
}
