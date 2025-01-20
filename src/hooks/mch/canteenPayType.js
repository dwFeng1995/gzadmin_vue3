import {reactive, toRefs, onMounted} from "vue"
// import  { updateCompanyPayTypeApi} from '@/api/companyPayType'
import  {getCanteenPayTypeListApi, getCnteenPayTypeDetailApi, updateCnteenPayTypeApi} from '@/api/canteenPayType'
import  {allPayTypeApi } from '@/api/payType'
import  {companyMiniListApi} from '@/api/company'
import {ElMessage} from "element-plus";

const state = reactive({
    primaryId: '',
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    keyWords: '',
    payTypeList: [],
    companyId: [],
    companyMiniList: [],
    updateDialogVisible: false,
    canteenName: ''
})

const main = ()=>{
    const newState = toRefs(state)
    const getCanteenPayTypeList =  async ()=>{
        const res = await getCanteenPayTypeListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            company_id : state.companyId,
            keywords: state.keyWords
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCanteenPayTypeList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCanteenPayTypeList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getCanteenPayTypeList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.keyWords = ''
        state.companyId = ''
        state.pageIndex = 1
        getCanteenPayTypeList()
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
    const getAllPayType = async ()=>{
        const res = await allPayTypeApi()
        state.payTypeList = res ?? []
    }
    const getDetail = async ({id})=>{
        const res = await  getCnteenPayTypeDetailApi(id)
        const length = Object.keys(res ?? {}).length
        if (length > 0) {
            await getAllPayType()
            state.primaryId = res?.id
            state.canteenName = res?.canteen_name
            if(res?.pay_system) {
                state.payTypeList = state.payTypeList.map(item=>Object.assign(item,{
                    checked: res.pay_system.find(pay=>pay.id === item.id) !== undefined
                }))
            }
            state.updateDialogVisible = true

        }
        console.log(res)
        console.log(id)
    }
    const updateCompanyPayType = async ()=>{
        const pay_type_id = state.payTypeList.filter(item=> item.checked === true).map(item=>item.id)
        const res = await updateCnteenPayTypeApi({canteen_id: state.primaryId, pay_type_id})
        if(res  === true) {
            ElMessage.success({
                message: '更新成功！',
                showClose: true
            })
            state.updateDialogVisible = false
            getCanteenPayTypeList()
        }
    }
    const updateDialogClosed = ()=>{
        state.canteenName = ''
        state.payTypeList = []
        state.primaryId = ''
    }
    onMounted(()=>{
        getCanteenPayTypeList()
        getCompanyMiniList()
    })
    return {
        ...newState,
        queryData,
        resetData,
        changePageIndex,
        changePageSize,
        getDetail,
        updateCompanyPayType,
        updateDialogClosed
    }

}





export  {
    main
}
