import {companyFunctionListApi, createCompanyFunctionApi, deleteCompanyFunctionApi, updateCompanyFunctionApi} from '@/api/companyFunction'
import {reactive, onMounted, toRefs, ref} from 'vue'
import { ElMessage, ElMessageBox } from "element-plus"

const createFormRef = ref(null)
const updateFormRef = ref(null)
const createClildRef = ref(null)
const updateClildRef = ref(null)
const createParams = reactive({
    code: '',
    code_name: '',
    type: '',
    remark: ''
})
const updateParams = reactive({
    code: '',
    code_name: '',
    type: '',
    remark: ''
})
const configModeList = [
    {
        value: 1,
        label: '后台配置'
    },
    {
        value: 2,
        label: 'H5配置'
    },
    {
        value: 3,
        label: '设备配置'
    }
]
const formRules = {
    code: [
        {
            required: true,
            message: '代号不能为空',
            trigger: 'blur',
        }
    ],
    code_name: [
        {
            required: true,
            message: '代号名称不能为空',
            trigger: 'blur',
        }
    ],
    type: [
        {
            required: true,
            message: '请选择配置方式',
            trigger: 'change',
        }
    ]
}

let  updateId = null
const index = () =>{
    const state = reactive({
        tableData: [],
        pageSize: 10,
        pageIndex: 1,
        pageTotal: 0,
        keyWords: '',
        isQuery: false,
        createDialogVisible: false,
        updateDialogVisible: false
    })
    const getCompanyFunctionList = async () =>{
        const res =  await companyFunctionListApi({
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
        getCompanyFunctionList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCompanyFunctionList()
    }
    const queryData = () =>{
      state.isQuery = true
      state.pageIndex = 1
      getCompanyFunctionList()
    }
    const resetData = () =>{
        state.keyWords = ''
        state.isQuery = false
        state.pageIndex = 1
        getCompanyFunctionList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.keyWords = ''
        }
    }
    const createDialogClosed = ()=>{
        createFormRef.value.resetFields()
    }
    const updateDialogClosed = ()=>{
        updateId = null
        updateFormRef.value.resetFields()
    }
    // 添加
    const submitCreate = (data) =>{
        createFormRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res =  await createCompanyFunctionApi(data)
            console.log('res',res)
            if(Number(res)>0)  {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                state.createDialogVisible = false
                getCompanyFunctionList()
            }
        })
    }
    const submitUpdate = async (data)=>{
       const res = await updateCompanyFunctionApi(updateId, data)
        if(Number(res)>0)  {
            ElMessage.success({
                message: '更新成功',
                showClose: true
            })
            state.updateDialogVisible = false
            getCompanyFunctionList()
        }
        console.log(data)
        console.log('updateId',updateId)
    }
    const clickCreate = ()=>{
        state.createDialogVisible = true
    }
    //点击编辑
    const clickEdit = (row) =>{
        updateId = row.id
        updateParams.code = row.code
        updateParams.code_name = row.code_name
        updateParams.type = row.type
        updateParams.remark = row.remark
        state.updateDialogVisible = true
        console.log(row)
    }
    // 删除
    const  deleteHandel = async (row)=>{
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
       await deleteCompanyFunctionApi(row.id)
        ElMessage.success({
            message: '删除成功',
            showClose: true
        })
        state.pageIndex = 1
        getCompanyFunctionList()
    }
    onMounted(()=>{
        getCompanyFunctionList()
    })
    const newState = toRefs(state)
    return {
        ...newState,
        changePageSize,
        changePageIndex,
        queryData,
        resetData,
        createDialogClosed,
        submitCreate,
        deleteHandel,
        clickEdit,
        submitUpdate,
        updateDialogClosed,
        clickCreate
    }
}




export {
    index,
    configModeList,
    formRules,
    createClildRef,
    createParams,
    updateParams,
    createFormRef,
    updateFormRef,
    updateClildRef
}

