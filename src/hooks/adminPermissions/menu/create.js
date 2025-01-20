import {reactive, ref, toRefs, onMounted} from "vue"
import  {createAdminMenuApi} from '@/api/adminMenu'
import {ElMessage} from "element-plus"
import  {getAdminPermissionsListApi} from '@/api/adminPermissions'
import  {getAdminMenuTypeListApi} from '@/api/adminMenuType'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const formParams = reactive({
    parent_id: '',
    title: '',
    order: '',
    uri: '',
    permission: [],
    redirect: '',
    is_hidden: 0,
    name: '',
    icon: '',
    web_icon: '',
    admin_menu_type_ids: []
})

const state = reactive({
    permissionsList: [],
    menuTypeList: []
})

const newState = toRefs(state)

const getAdminPermissionsList = async ()=>{
    const res = await getAdminPermissionsListApi({
        page: 0
    })
   state.permissionsList = res ?? []
}

const getAdminMenuTypeList = async ()=>{
    const res = await getAdminMenuTypeListApi({})
    state.menuTypeList = res ?? []
}

const resterForm = ()=>{
    formRef.value.resetFields()
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.permission = formData.permission.join(',')
            formData.admin_menu_type_ids = formData.admin_menu_type_ids.join(',')
            const res = await createAdminMenuApi(formData)
            if(res) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log('emit', emit)
    }
    onMounted(()=>{
        getAdminPermissionsList()
        getAdminMenuTypeList()
    })
    return {
        ...newState,
        resterForm,
        submitForm
    }

}

export  {
    main,
    formRef,
    formParams
}
