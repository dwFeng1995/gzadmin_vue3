import { reactive, toRefs, ref, onMounted } from 'vue'
import { companyMiniListApi } from '@/api/company'
import { deepCopy } from "@/utils/object"
import { treeData } from '@/utils/tree'
import { userDepartListApi, userGroupListApi } from '@/api/yqMerchantPayment'
import { ElMessage, ElMessageBox } from 'element-plus'
import { deleteUserGroupListApi,deleteUserDepartListApi } from '@/api/userAdmin/userList'
const treeRef = ref(null)
const state = reactive({
    keyWords: '',
    pageSize: 10,
    pageIndex: 1,
    pageTotal: 0,
    platformAllList: [],
    payPlatFormId: [],
    tableData: [],
    dialogVisible: false,
    companyMiniList: [],
    companyId: '',
    activeIndex: 1,
    userGroupList: [],
    userGroupIds: [],
    departList: [],
    departIds: [],
    props: { label: 'depart_name', children: 'children' }
})

//点击查询按钮
const queryData = (() => {
    state.pageIndex = 1
})
//点击刷新resetData按钮
const resetData = (() => {
    state.keyWords = ''
    state.payPlatFormId = []
    state.pageIndex = 1
})
//条码
const changePageSize = (newPageSize) => {
    state.pageIndex = 1
    state.pageSize = newPageSize
}
// 页码
const changePageIndex = (newPageIndex) => {
    state.pageIndex = newPageIndex
}

// 选择企业
const changeCompany = () => {
    state.activeIndex = 1
    getUserGroupList()
}

// 选择部门/用户组
const handleSelect = (val) => {
    state.activeIndex = val
    state.userGroupList = []
    if (val == 1) return getUserGroupList()
    getUserDepartList()
}

// 用户组选中Id
const handleSelectionChange = (val) => {
    state.userGroupIds = val.map(x => x.id)
}

// 获取企业列表数据
const getCompanyMiniList = async () => {
    const res = await companyMiniListApi()
    state.companyMiniList = res ?? []
}

//获取所有用户组列表数据
const getUserGroupList = async () => {
    const res = await userGroupListApi({
        company_id: state.companyId
    })
    state.userGroupList = res
}

//获取所有部门列表数据
const getUserDepartList = async () => {
    const res = await userDepartListApi({
        company_id: state.companyId
    })
    state.departList = treeData(deepCopy(res))
}

// 获取当前选中部门
const handleCheckChange = () => {
    state.departIds = treeRef.value.getCheckedKeys()
}

// 删除
const handleDelete = async () => {
    if ((state.activeIndex == 1 && !state.userGroupIds.length) || (state.activeIndex == 2 && !state.departIds.length)) return ElMessage.warning({ message: '请勾选要删除的数据项', showClose: true })
    if (state.activeIndex == 1) {
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
        const res = deleteUserGroupListApi({ group_ids: state.userGroupIds.join(',') })
        if (res) {
            ElMessage.success({
                message: '删除成功',
                showClose: true
            })
            getUserGroupList()
        }
    } else {
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
        const res = deleteUserDepartListApi({ depart_ids: state.departIds.join(',') })
        if (res) {
            ElMessage.success({
                message: '删除成功',
                showClose: true
            })
            getUserDepartList()
        }
    }
}



const main = () => {
    onMounted(() => {
        getCompanyMiniList()
    })
    return {
        ...toRefs(state),
        queryData,
        resetData,
        changePageSize,
        changePageIndex,
        handleDelete,
        changeCompany,
        handleSelect,
        handleSelectionChange,
        handleCheckChange,
    }
}

export {
    main,
    treeRef
}