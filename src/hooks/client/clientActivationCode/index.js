import { reactive, toRefs, onMounted,ref, nextTick } from 'vue'
import { getClientActivationCodeApi,deleteActivationCodeApi,getQrCodeApi } from '@/api/clientActivationCode.js'
import { getCanteenMiniListApi } from '@/api/canteen'
import { companyMiniListApi } from '@/api/company'
import { allClientTypeApi } from '@/api/clientType'
import {ElMessage,ElMessageBox} from "element-plus"
const createChildRef=ref(null)
const state = reactive({
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    canteenId: '',
    companyId: '',
    clientTypeId: '',
    keyWords:'',
    isQuery: false,
    canteenMiniList: [],
    companyMiniList: [],
    clientTypeMiniList: [],
    tableData: [],
    qrCodeData:null,
    createDrawer:false,
    dialogVisible:false

})
export const main = () => {
    // 企业列表
    const getCompanyMiniList = async () => {
        const res = await companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    // 食堂列表
    const getCanteenMiniList = async () => {
        const res = await getCanteenMiniListApi()
        state.canteenMiniList = res ?? []
    }
    // 设备类型列表
    const getClientTypeMiniList = async () => {
        const res = await allClientTypeApi()
        state.clientTypeMiniList = res ?? []
    }
    // 激活码列表
    const getClientActivationCodeList = async () => {
        const params = {
            page: state.pageIndex,
            page_size: state.pageSize,
            canteen_id: state.canteenId,
            company_id: state.companyId,
            client_type_id: state.clientTypeId,
            keyword:state.keyWords
        }
        const res = await getClientActivationCodeApi(params)
        state.tableData = res.data ?? []
        state.pageTotal=res.total
        console.log(state.tableData);
    }

    const deleteActivationCode = async({id})=>{
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
        const res = await deleteActivationCodeApi(id)
        if(res==null) {
            ElMessage.success({
                message: '删除成功！',
                showClose: true
            })
            getClientActivationCodeList()
        }
    }

    const handleQrCode=async (id)=>{
     const res=await getQrCodeApi(id)
     state.qrCodeData=res??{}
     state.dialogVisible=true
    }

    const activationCodeBtn=()=>{
        state.createDrawer=true
        nextTick(()=>{
            createChildRef.value.resetData()
        })
    }
    


    const changePageSize = (newPageSize) => {
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getClientActivationCodeList()
    }
    const changePageIndex = (newPageIndex) => {
        isClickQuery()
        state.pageIndex = newPageIndex
        getClientActivationCodeList()
    }
    const queryData = () => {
        state.isQuery = true
        state.pageIndex = 1
        getClientActivationCodeList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.canteenId = ''
        state.keyWords = ''
        state.companyId= '',
        state.clientTypeId= '',
        state.pageIndex = 1
        getClientActivationCodeList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.canteenId = ''
            state.keyWords = ''
            state.companyId= '',
            state.clientTypeId= ''
        }
    }
    const submitActivationCode=()=>{
        createChildRef.value.submitCrate()
    }

    const refreshData=()=>{
        state.createDrawer=false
        getClientActivationCodeList()
    }

    onMounted(() => {
        getClientActivationCodeList()
        getCompanyMiniList()
        getCanteenMiniList()
        getClientTypeMiniList()
    })
    return {
        changePageSize,
        changePageIndex,
        queryData,
        resetData,
        deleteActivationCode,
        activationCodeBtn,
        submitActivationCode,
        refreshData,
        handleQrCode,
        createChildRef,
        ...toRefs(state)
    }
}