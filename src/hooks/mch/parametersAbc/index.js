import { reactive, toRefs, ref, onMounted } from "vue"
import { getMchPlatformListApi, getMchPlatformDetailApi, deleteMchPlatformApi } from '@/api/paymentPlatform'
import { ElMessage, ElMessageBox } from "element-plus"
import { companyMiniListApi } from '@/api/company'
import { deepCopy } from "@/utils/object"
const createChildRef = ref(null)
const updateChildRef = ref(null)

const state = reactive({
    tableData: [],
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    isQuery: false,
    keyWords: '',
    companyMiniList: [],
    createDialogVisible: false,
    updateDialogVisible: false,
    detail: {},
    companyId: '',
    OrderIndexArr: [],
    company_noArr: [],
})
const getCompanyMiniList = async () => {
    const res = await companyMiniListApi()
    state.companyMiniList = res ?? []
}

const getMchPlatformList = async () => {
    const res = await getMchPlatformListApi({
        page: state.pageIndex,
        page_size: state.pageSize,
        pay_type_code: 'ABC_CENTER',
        company_id: state.companyId
        // keywords: state.keyWords
    })
    state.tableData = handeTableData(deepCopy(res?.data ?? []))
    state.pageTotal = res?.total
}


// 数据整合
const handeTableData = (data) => {
    data.forEach(x => Object.assign(x, { info: data.filter((v) => v.company_id == x.company_id) }));
    function dataUnique() {
        let result = []
        data.forEach((x) => {
            if (result.find((v => v.company_id == x.company_id)) == undefined) return result.push(x)
        })
        return result
    }
    let result = []
    dataUnique().forEach((x => {
        x.info.forEach((v, vi) => {
            result.push({
                ...v,
                oneRowSpan: vi === 0 ? x.info.length : 0
            })
        })
    }))
    return result
}

// 表格合并
const objectSpanMethod = ({ row, columnIndex }) => {
    if (columnIndex === 0) {
        return {
            rowspan: row.oneRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
            colspan: row.oneRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
        };
    }
    if (columnIndex === 1) {
        return {
            rowspan: row.oneRowSpan, // 待合并行数 -- 合并的行数长度就等于之前赋值的子数据的长度；未赋值的即表示0，不显示
            colspan: row.oneRowSpan > 0 ? 1 : 0, // 待合并列数 -- 合并的列数自身占一列，被合并的要返回0，表示不显示
        };
    }
}

const changePageSize = (newPageSize) => {
    isClickQuery()
    state.pageIndex = 1
    state.pageSize = newPageSize
    state.tableData = []
    state.OrderIndexArr = []
    state.company_noArr = []
    getMchPlatformList()
}
const changePageIndex = (newPageIndex) => {
    isClickQuery()
    state.pageIndex = newPageIndex
    state.tableData = []
    state.OrderIndexArr = []
    state.company_noArr = []
    getMchPlatformList()
}
const queryData = () => {
    state.isQuery = true
    state.pageIndex = 1
    getMchPlatformList()
}
const resetData = () => {
    state.isQuery = false
    // state.keyWords = ''
    state.companyId = ''
    state.pageIndex = 1
    getMchPlatformList()
}
const isClickQuery = () => {
    if (!state.isQuery) {
        // state.keyWords = ''
        state.companyId = ''
    }
}

const createDialogClosed = () => {
    createChildRef.value.resterForm()
}
const submitCreate = () => {
    createChildRef.value.submitForm()
}

const updateDialogClosed = () => {
    updateChildRef.value.resterForm()
}
const submitUpdate = () => {
    updateChildRef.value.submitForm()
}
const refreshData = (flag) => {
    state.createDialogVisible = false
    state.updateDialogVisible = false
    if (flag) {
        getMchPlatformList()
    }
}


const getMchPlatformDetail = async ({ id }) => {
    const res = await getMchPlatformDetailApi(id, { pay_type_code: 'ABC_CENTER' })
    const length = Object.keys(res ?? {}).length
    if (length > 0) {
        state.detail = res
        state.updateDialogVisible = true
    }
    console.log(res)
}

const deleteMchPlatform = async ({ id }) => {
    const resultConfim = await ElMessageBox.confirm(
        '是否删除这条记录?',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).catch(err => err)
    if (resultConfim !== 'confirm') {
        return ElMessage.info({
            message: '已取消删除',
            showClose: true
        })
    }
    const res = await deleteMchPlatformApi(id, {
        pay_type_code: 'ABC_CENTER'
    })
    if (res) {
        ElMessage.success({
            message: '删除成功！',
            showClose: true
        })
        getMchPlatformList()
    }
}



const main = () => {
    const newState = toRefs(state)
    onMounted(() => {
        getMchPlatformList()
        getCompanyMiniList()
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
        getMchPlatformDetail,
        updateDialogClosed,
        submitUpdate,
        deleteMchPlatform,
        objectSpanMethod
    }
}

export {
    main,
    updateChildRef,
    createChildRef
}
