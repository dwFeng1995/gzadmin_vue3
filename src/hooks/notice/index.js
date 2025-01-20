import { reactive, toRefs, ref, onMounted } from 'vue'
import { ElMessage } from "element-plus"
import { upgradePromptListApi, updatePromptApi } from '@/api/notice.js'
const updateChildRef = ref(null)
const state = reactive({
    tableData: [],
    updateDrawerVisible: false,
    Info: {}
})

export const main = () => {

    const updateDrawerClosed = () => {
        updateChildRef.value.resetForm()
    }

    const handleEdit = (row) => {
        state.Info = row
        state.updateDrawerVisible = true
    }

    const getUpgradePromptList = async () => {
        const res = await upgradePromptListApi()
        res.forEach(element => {
            element.enable = element.enable ? true : false
        });
        state.tableData = res
    }
    const changeSwitch = async ({ enable, id }) => {
        const res = await updatePromptApi({ enable: enable ? 1 : 0 }, id)
        try {
            getUpgradePromptList()
            ElMessage.success({
                message: '状态更新成功',
                showClose: true
            })
        } catch {
            enable = !enable
            console.log(res);
        }

    }

    const submitUpdate = () => {
        updateChildRef.value.submitUpdate()
    }
    
    const refreshData = () => {
        state.updateDrawerVisible = false
        setTimeout(()=>{ getUpgradePromptList()},500)
        
    }

    onMounted(() => {
        getUpgradePromptList()
    })
    return {
        ...toRefs(state),
        updateChildRef,
        updateDrawerClosed,
        handleEdit,
        submitUpdate,
        changeSwitch,
        refreshData
    }
}