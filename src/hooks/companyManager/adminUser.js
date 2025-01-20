import { adminUserListApi, createUserAdminApi, updateUserAdminApi, deleteUserAdminApi, changeUserStatusApi } from '@/api/adminUser'
import { reactive, onMounted, toRefs, ref } from 'vue'
import { ElMessage, ElMessageBox } from "element-plus"
import md5 from "blueimp-md5"
const createFormRef = ref(null)
const updateFormRef = ref(null)
const createClildRef = ref(null)
const updateClildRef = ref(null)
const userTypeList = [
    {
        label: '企业账号',
        value: 1
    },
    {
        label: '食堂账号',
        value: 2
    }
]
const formRules = {
    username: [
        {
            required: true,
            message: '用户名不能为空',
            trigger: 'blur',
        }
    ],
    password: [
        {
            required: true,
            message: '密码名称不能为空',
            trigger: 'blur',
        },
        { min:6, message: '最少输入6位数', trigger: 'blur' },
    ],
    // phone: [
    //     {
    //         required: true,
    //         message: '手机号不能为空',
    //         trigger: 'blur',
    //     }
    // ],
    user_type: [
        {
            required: true,
            message: '请选择用户类型',
            trigger: 'change',
        }
    ]
}
const createParams = reactive({
    username: '',
    password: '',
    phone: '',
    user_type: '',
    is_on: 1
})

const updateParams = reactive({
    username: '',
    password: '',
    phone: '',
    user_type: '',
    is_on: 1
})

let updateId = null
const main = () => {
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
    const getAdminUserList = async () => {
        const res = await adminUserListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            keywords: state.keyWords
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
    }
    const changePageSize = (newPageSize) => {
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getAdminUserList()
    }
    const changePageIndex = (newPageIndex) => {
        isClickQuery()
        state.pageIndex = newPageIndex
        getAdminUserList()
    }
    const queryData = () => {
        state.isQuery = true
        state.pageIndex = 1
        getAdminUserList()
    }
    const resetData = () => {
        state.keyWords = ''
        state.isQuery = false
        state.pageIndex = 1
        getAdminUserList()
    }
    const isClickQuery = () => {
        if (!state.isQuery) {
            state.keyWords = ''
        }
    }
    const submitCreate = ({ username, password, phone, user_type, is_on }) => {
        createFormRef.value.validate(async valid => {
            if (!valid) {
                return
            }
            const res = await createUserAdminApi({
                username,
                password: md5(password),
                phone,
                user_type,
                is_on
            })
            console.log('res', res)
            if (Number(res) > 0) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                state.createDialogVisible = false
                getAdminUserList()
            }
        })
    }
    const submitUpdate = ({ password, phone, is_on }) => {
        updateFormRef.value.validate(async valid => {
            if (!valid) {
                return
            }
            const res = await updateUserAdminApi(updateId, {
                password: md5(password),
                phone,
                is_on
            })
            console.log('res', res)
            if (Number(res) > 0) {
                ElMessage.success({
                    message: '更新成功',
                    showClose: true
                })
                state.updateDialogVisible = false
                getAdminUserList()
            }
        })
    }
    const clickEdit = ({ id, username, password, phone, user_type, is_on }) => {
        updateId = id
        updateParams.username = username
        updateParams.password = password
        updateParams.phone = phone
        updateParams.is_on = is_on
        updateParams.user_type = user_type
        state.updateDialogVisible = true
    }

    // 删除
    const deleteHandel = async (row) => {
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
        const res = await deleteUserAdminApi(row.id)
        if (res === true || res > 0) {
            ElMessage.success({
                message: '删除成功',
                showClose: true
            })
        }

        state.pageIndex = 1
        getAdminUserList()
    }
    const createDialogClosed = () => {
        createFormRef.value.resetFields()
    }
    const updateDialogClosed = () => {
        updateId = null
        updateFormRef.value.resetFields()
    }
    const userStatusHandel = async ({ id }) => {
        await changeUserStatusApi(id)
        ElMessage.success({
            message: '更新用户状态成功',
            showClose: true
        })
        getAdminUserList()
    }
    onMounted(() => {
        getAdminUserList()
    })
    const newState = toRefs(state)
    return {
        ...newState,
        changePageSize,
        changePageIndex,
        queryData,
        resetData,
        submitCreate,
        createDialogClosed,
        updateDialogClosed,
        submitUpdate,
        clickEdit,
        deleteHandel,
        userStatusHandel

    }
}

export {
    main,
    createFormRef,
    updateFormRef,
    createClildRef,
    updateClildRef,
    userTypeList,
    createParams,
    updateParams,
    formRules,
    updateId,
}
