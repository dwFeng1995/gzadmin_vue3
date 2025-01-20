import {reactive, ref, toRefs, onMounted} from "vue"
import  {updateAdminMenuApi} from '@/api/adminMenu'
import {ElMessage} from "element-plus"
import  {getAdminPermissionsListApi} from '@/api/adminPermissions'
import  {getAdminMenuTypeListApi} from '@/api/adminMenuType'
import {deepCopy} from "@/utils/object"

const formRef = ref(null)
const formParams = reactive({
    id: '',
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

const initDetail = async (props)=>{
    console.log(props.detail)
   await getAdminPermissionsList()
   await getAdminMenuTypeList()
    formParams.id = props?.detail?.id
    formParams.parent_id = props?.detail?.parent_id
    formParams.title = props?.detail?.title
    formParams.order = props?.detail?.order
    formParams.uri = props?.detail?.uri
    formParams.permission =  (props?.detail?.permission ?? '').split(',')
    formParams.redirect = props?.detail?.redirect
    formParams.is_hidden = props?.detail?.is_hidden
    formParams.name = props?.detail?.name
    formParams.icon = props?.detail?.icon
    formParams.web_icon = props?.detail?.web_icon
    formParams.admin_menu_type_ids = props?.detail?.admin_menu_type.map(item=>item.admin_menu_type_id)
}

const main = (props,emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.permission = formData.permission.join(',')
            formData.admin_menu_type_ids = formData.admin_menu_type_ids.join(',')
            formData.id = undefined
            const res = await updateAdminMenuApi(formData, formParams.id)
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
        initDetail(props)

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
