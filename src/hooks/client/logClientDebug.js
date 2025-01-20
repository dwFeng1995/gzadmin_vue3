import {reactive, toRefs, onMounted} from  "vue"
import  {getLogClientDebugListApi} from '@/api/logCientDebug'
import {getCanteenMiniListApi} from '@/api/canteen'
import  {companyMiniListApi} from '@/api/company'
import  {getClientPayListApi} from '@/api/canteenClient'

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    canteenMiniList: [],
    companyMiniList: [],
    canteenId: '',
    companyId: '',
    clientId: '',
    clientPayMiniList: []
})

const main = ()=>{
    const newState= toRefs(state)
    const getLogClientDebugList = async ()=>{
        const  res = await getLogClientDebugListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            canteen_id: state.canteenId,
            company_id: state.companyId,
            client_id: state.clientId
        })
        console.log('res',res)
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const getCanteenMiniList = async ()=>{
        const res = await getCanteenMiniListApi()
        state.canteenMiniList = res ?? []
    }
    const getCompanyMiniList = async ()=>{
        const res = await  companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const getClientPayList = async  ()=>{
        const res = await getClientPayListApi({})
        state.clientPayMiniList = res ?? []
    }

    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getLogClientDebugList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getLogClientDebugList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getLogClientDebugList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.canteenId = ''
        state.companyId = ''
        state.clientId = ''
        state.pageIndex = 1
        getLogClientDebugList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.canteenId = ''
            state.companyId = ''
            state.clientId = ''
        }
    }
    onMounted(()=>{
        getLogClientDebugList()
        getCanteenMiniList()
        getCompanyMiniList()
        getClientPayList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex
    }
}

export {
    main
}
