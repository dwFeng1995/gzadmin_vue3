import {reactive, toRefs, ref, onMounted} from "vue"
import  {getAgreementListApi, getAgreementDetailApi, deleteAgreementApi} from '@/api/agreement'
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
    detail: {}
})

const getAgreementList = async ()=>{
    const res = await getAgreementListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        keywords: state.keyWords
    })
    state.tableData = res?.data ?? []
    state.pageTotal = res?.total
}

const changePageSize = (newPageSize)=>{
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    getAgreementList()
}
const changePageIndex = (newPageIndex) =>{
    isClickQuery()
    state.pageIndex = newPageIndex
    getAgreementList()
}
const queryData = () =>{
    state.isQuery = true
    state.pageIndex = 1
    getAgreementList()
}
const resetData = () =>{
    state.isQuery = false
    state.keyWords = ''
    state.pageIndex = 1
    getAgreementList()
}
const isClickQuery = ()=>{
    if(!state.isQuery) {
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
        getAgreementList()
    }
}


const getAgreementDetail = async ({id})=>{
    const res = await getAgreementDetailApi(id)
    const length = Object.keys(res ?? {}).length
    if (length>0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteAgreement = async({id})=>{
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
    const res = await deleteAgreementApi(id)
    if(res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getAgreementList()
    }
}


const main = ()=>{
    const newState = toRefs(state)
    onMounted(()=>{
        getAgreementList()
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
        getAgreementDetail,
        updateDialogClosed,
        submitUpdate,
        deleteAgreement
    }
}

export  {
    main,
    updateChildRef,
    createChildRef
}
