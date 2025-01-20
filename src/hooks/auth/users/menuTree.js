import { reactive, ref, onMounted, toRefs } from "vue"
import { updateUserMenuApi } from '@/api/permissions'
import { ElMessage } from "element-plus"
import { menuGrouping } from '@/utils/menu'
import { formParams } from "./update";
import { getMenuListApi } from '@/api/menu'
import { deepCopy } from "@/utils/object";
//
const formRef = ref(null)
const treeRef = ref(null)

const state = reactive({
    ad_user_id: '',
    username: '',
    name: '',
    treeData: [],
    defaultExpandedKeys: [], //展开树的哪些节点
    defaultCheckedKeys: [],  //树的默认选中
    parentList: []
})

const newState = toRefs(state)
const getMenuList = async () => {
  
    const res = await getMenuListApi({})
    state.allMenuList = deepCopy(res)
    const { menu, parent } = menuGrouping(res ?? [])
    state.treeData = menu ?? []
    state.parentList = parent ?? []
}



const initDetail = async (props) => {
    await getMenuList()
    state.ad_user_id = props?.detail?.id
    state.username = props?.detail?.username
    state.name = props?.detail?.name
    //设置树的展开
    state.defaultExpandedKeys = Array.from(new Set(props.userMenu.map(item => item.parent_id)))
    //设置树的选中
    const arr = []
    props.userMenu.forEach(item => {
        // parent_id 不为0 说明是子节点
        if (item.parent_id !== 0) {
            arr.push(item.menu_id)
        }
        //这里是父节点 但我们只要没有子集的父节点，否则父节点下的子节点回全部选中（树的原因）
        if (item.parent_id === 0) {
            const menu = state.treeData.find(x => x.id === item.menu_id)
            if (menu !== undefined && menu.child.length === 0) {
                arr.push(item.menu_id)
            }
        }
    })
    state.defaultCheckedKeys = arr
}

const resterForm = () => {
    state.treeData = []
    state.defaultExpandedKeys = []
    state.defaultCheckedKeys = []
    state.ad_user_id = ''
    state.username = ''
    state.name = ''
}


const main = (props, emit) => {
    const submitForm = async () => {
        //获取父级id
        const parentMenuId = state.parentList.filter(x => treeRef.value.getCheckedNodes(false, false).find(y => y.parent_id === x.id)).map(item => item.id)
        //选中的id   选中的id不一定包含了父级的id 。
        // 如果树的父节点处于半选，就不包含父级的id
        //如果树的父节点全选，就包含父级id
        const childMenuId = treeRef.value.getCheckedKeys(false)
        //获取选中的id，包括父级id，去重
        const menuIdlist = Array.from(new Set([...parentMenuId, ...childMenuId, 1]))
        const res = await updateUserMenuApi({ menu_id: menuIdlist.join(',') }, state.ad_user_id)
        if (res) {
            ElMessage.success({
                message: '更新成功',
                showClose: true
            })
            emit('refreshData', false)
        }
        console.log(emit)
    }
    onMounted(() => {
        initDetail(props)
    })
    return {
        ...newState,
        submitForm,
        resterForm
    }

}

export {
    main,
    formRef,
    treeRef,
    formParams
}
