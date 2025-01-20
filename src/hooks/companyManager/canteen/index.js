import  {canteenListApi, deleteCanteenApi, canteenDetailApi} from '@/api/canteen'
import  {companyMiniListApi} from '@/api/company'
import {reactive, onMounted, toRefs, ref} from 'vue'
import {ElMessage, ElMessageBox} from "element-plus";

const createFormRef = ref(null)
const updateFormRef = ref(null)
const createClildRef = ref(null)
const updateClildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    keyWords: '',
    companyId: '',
    isQuery: false,
    companyMiniList: [],
    createDrawerVisible: false,
    updateDrawerVisible: false,
    detail: {}
})
const main = ()=>{
    const getCanteenList =  async ()=>{
        const res = await canteenListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            keywords: state.keyWords,
            company_id: state.companyId
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCanteenList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCanteenList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getCanteenList()
    }
    const resetData = () =>{
        state.keyWords = ''
        state.companyId = ''
        state.isQuery = false
        state.pageIndex = 1
        getCanteenList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.keyWords = ''
            state.companyId = ''
        }
    }
    const getCompanyMiniList = async ()=>{
        const res = await  companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    //添加或者编辑成功  刷新表格数据
    const refreshData = (flag)=>{
        state.createDrawerVisible = false
        state.updateDrawerVisible = false
        if(flag === true) {
            getCanteenList()
        }
    }
    //对话框关闭的回调
    const createDrawerClosed = ()=>{
        createClildRef.value.resetForm()
    }
    const updateDrawerClosed = ()=>{
        updateClildRef.value.resetForm()
    }
    //删除操作
    const deleteCanteen = async ({id})=>{
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
        const res = await deleteCanteenApi(id)
        if(res === true) {
            ElMessage.success({
                message: '删除成功',
                showClose: true
            })
            getCanteenList()
        }else {
            ElMessage.error({
                message: '删除失败',
                showClose: true
            })
        }

    }
    const getCanteenDetail = async ({id})=>{
        const res =  await canteenDetailApi(id)
        const length = Object.keys(res ?? {}).length
        if(length >0) {
            state.detail = res
            state.updateDrawerVisible = true
        }
        console.log('详情是',res)
    }

    onMounted(()=>{
        getCompanyMiniList()
        getCanteenList()
    })

    const newState = toRefs(state)
    return {
        ...newState,
        changePageSize,
        changePageIndex,
        queryData,
        resetData,
        refreshData,
        createDrawerClosed,
        updateDrawerClosed,
        deleteCanteen,
        getCanteenDetail
    }
}

export  {
    main,
    createFormRef,
    updateFormRef,
    createClildRef,
    updateClildRef,
    // createParams
}
