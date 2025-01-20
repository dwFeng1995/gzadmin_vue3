import {reactive, toRefs, onMounted} from "vue"
import  {getCompanyPayTypeListApi, getCompanyPayTypeDetailApi, updateCompanyPayTypeApi} from '@/api/companyPayType'
import  {allPayTypeApi } from '@/api/payType'
import  {companyMiniListApi} from '@/api/company'
import {ElMessage} from "element-plus"

const state = reactive({
    primaryId: '',
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    keyWords: '',
    payTypeList: [],
    // detailPayType: [],
    companyMiniList: [],
    updateDialogVisible: false
})

const main = ()=>{
    const newState = toRefs(state)
    const getCompanyPayTypeList =  async ()=>{
        const res = await getCompanyPayTypeListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            client_fun_info_id : state.clientFunInfoId,
            keywords: state.keyWords
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCompanyPayTypeList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCompanyPayTypeList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getCompanyPayTypeList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.keyWords = ''
        state.pageIndex = 1
        getCompanyPayTypeList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.keyWords = ''
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
        const res = await  getCompanyPayTypeDetailApi(id)
        const length = Object.keys(res ?? {}).length
        if (length > 0) {
            await getCompanyMiniList()
            await getAllPayType()
            state.primaryId = res?.id
            if(res?.pay_type?.pay_code) {
                const payCodeList = res.pay_type.pay_code.split(',')
                state.payTypeList = state.payTypeList.map(item=>Object.assign(item,{
                    checked: payCodeList.find(code=> code === item.code) !== undefined
                }))
                console.log(' state.payTypeLis',  state.payTypeList)
            }
            state.updateDialogVisible = true

        }
        console.log(res)
        console.log(id)
    }
    const updateCompanyPayType = async ()=>{
        const pay_code = state.payTypeList.filter(item=> item.checked === true).map(item=>item.code).join(',')
        const res = await updateCompanyPayTypeApi({company_id: state.primaryId, pay_code})
        if(res !== {}) {
            ElMessage.success({
                message: '更新成功！',
                showClose: true
            })
            state.updateDialogVisible = false
            getCompanyPayTypeList()
        }
    }
    const updateDialogClosed = ()=>{
        state.payTypeList = []
        state.primaryId = ''
    }
    onMounted(()=>{
        getCompanyPayTypeList()
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
