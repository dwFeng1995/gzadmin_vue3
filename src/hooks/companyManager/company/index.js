import {companyListApi } from '@/api/company'
import {reactive, onMounted, toRefs} from 'vue'
import router from "@/router/index"
import  {deepCopy} from '@/utils/object'
import store from '@/store/index'
const main = ()=>{
    const state = reactive({
        tableData: [],
        pageSize: router.currentRoute.value.query.pageSize ?? 10,
        pageIndex: router.currentRoute.value.query.pageIndex ?? 1,
        pageTotal: 0,
        keyWords: router.currentRoute.value.query.keyWords ?? "",
        isQuery: false,
    })
    const getCompanyList =  async ()=>{
        const res = await companyListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            keyword: state.keyWords
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getCompanyList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getCompanyList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getCompanyList()
    }
    const resetData = () =>{
        state.keyWords = ''
        state.isQuery = false
        state.pageIndex = 1
        getCompanyList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.keyWords = ''
        }
    }
    const goToCreate = ()=>{
        closeCreate()
        // router.push('/companyManager/company/create')
        router.push({
            name: 'CompanyCreate',
            query:{
                keyWords:state.keyWords,
                pageIndex:state.pageIndex,
                pageSize:state.pageSize
            }
        })
    }
    const goToUpdate = ({id})=>{
        closeUpdate()
        // router.push(`/companyManager/company/update/${id}`)
        router.push({
            name: 'CompanyUpdate',
            params: {
                id
            },query:{
                keyWords:state.keyWords,
                pageIndex:state.pageIndex,
                pageSize:state.pageSize
            }
        })
    }
    const closeUpdate = ()=>{
        if(store?.state?.tagsList) {
            const newTagList = deepCopy(store?.state?.tagsList).filter(item=>item.name !== 'CompanyUpdate')
            store.commit('closeTagsOther',reactive(newTagList))
        }
    }
    const closeCreate = ()=>{
        if(store?.state?.tagsList) {
            const newTagList = deepCopy(store?.state?.tagsList).filter(item=>item.name !== 'CompanyCreate')
            store.commit('closeTagsOther',reactive(newTagList))
        }
    }
    onMounted(()=>{
        closeUpdate()
        closeCreate()
        getCompanyList()
    })
    const newState = toRefs(state)
    return {
        ...newState,
        changePageSize,
        changePageIndex,
        queryData,
        resetData,
        goToCreate,
        goToUpdate
    }
}

export  {
    main
}
