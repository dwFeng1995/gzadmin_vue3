import {reactive, ref, toRefs, onMounted} from "vue"
import {getAdminConfigListApi, adminConfigStatusApi, adminConfigDetailApi, deleteAdminConfigApi} from '@/api/adminConfig'
import {ElMessage, ElMessageBox} from 'element-plus'
const createChildRef = ref(null)
const updateChildRef = ref(null)


const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    keyWords: '',
    isQuery: false,
    createDrawerVisible: false,
    updateDrawerVisible: false,
    detail: {}
})
const main = ()=>{
    const newState = toRefs(state)
    const getAdminConfigList =  async ()=>{
        const res = await getAdminConfigListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            keywords: state.keyWords
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getAdminConfigList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getAdminConfigList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getAdminConfigList()
    }
    const resetData = () =>{
        state.keyWords = ''
        state.isQuery = false
        state.pageIndex = 1
        getAdminConfigList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            // state.clientFunInfoId = ''
            state.keyWords = ''
        }
    }
    const changeStatus = async ({id})=>{
       const res = await adminConfigStatusApi(id)
        if(Number(res)>0) {
            ElMessage.success({
                message: '状态更新成功',
                showClose: true
            })
        }
        getAdminConfigList()
    }
    const createDrawerClosed = ()=>{
        createChildRef.value.resetForm()
    }
    const updateDrawerClosed = ()=>{
        updateChildRef.value.resetForm()
    }
     const submitCreate = ()=>{
         createChildRef.value.submitForm()
     }
    const submitUpdate = ()=>{
        updateChildRef.value.submitForm()
    }

    const refreshData = (flag)=>{
        state.createDrawerVisible = false
        state.updateDrawerVisible = false
        // state = false
        if(flag === true) {
            getAdminConfigList()
        }
    }
    const getDetail = async ({id})=>{
       const res = await  adminConfigDetailApi(id)
        const length = Object.keys(res ?? {}).length
        if(length>0) {
            state.detail = res
            state.updateDrawerVisible = true
        }
        console.log('res',res)
    }
    const deleteConfig =  async  ({id})=>{
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
        const res = await deleteAdminConfigApi(id)
        if(Number(res) >0) {
            ElMessage.success({
                message: '删除成功',
                showClose: true
            })
            getAdminConfigList()
        }else {
            ElMessage.error({
                message: '删除失败',
                showClose: true
            })
        }
    }
    onMounted(()=>{
        getAdminConfigList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        changePageIndex,
        changePageSize,
        changeStatus,
        createDrawerClosed,
        updateDrawerClosed,
        submitCreate,
        submitUpdate,
        refreshData,
        getDetail,
        deleteConfig
    }
}

export  {
    main,
    createChildRef,
    updateChildRef
}
