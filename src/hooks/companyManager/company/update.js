import {companyFunctionApi, companyDetailApi, updateCompanyApi } from '@/api/company'
import {allClientTypeApi } from '@/api/clientType'
import {allAdminUserApi } from '@/api/adminUser'
import  {allPaySystemApi} from  '@/api/paySystem'
import {reactive, onMounted, toRefs, ref} from 'vue'
import  router from '@/router/index'
import store from '@/store/index'
import  {deepCopy} from '@/utils/object'
import {ElMessage} from "element-plus"
const companyFormRef = ref(null)

const state = reactive({
    formModel: {
        company_name: '',
        company_no: '',
        admin_user_id: '',
        remark: '',
        pay_system_ip: '',
        pay_system_id: '',
        client_pay_system: 'gezi',
        import_nutriment_status: '0',  //营养成分导入状态，0未导入（可导入）1导入中 2已导入
        jsapi_pay_system: '',
        diy_canteen: {
            enable: false,
            data: ''
        },
        addDivClient: {
            enable: false,
            list: [
                {id: '', value: ''}
            ]
        },
        secret_key: '',
        faceSystem: [],
        password:''
    },
    adminUserList: [],
    clientFnList: [],
    h5FnList: [],
    adminFnList: [],
    faceSystemFnList: [],
    paySystemList: [],
    clientTypeList: [],
    updateId: null
})
// 下拉框用户
const getAdminUserList = async ()=>{
    const res = await allAdminUserApi()
    state.adminUserList = res ?? []
    console.log('用户')
}
//下拉框支付系统
const getPaySystemList = async ()=>{
    const res = await allPaySystemApi()
    state.paySystemList = res ?? []
    console.log('支付')
}
//企业功能
const getCompanyFunction = async ()=>{
    const res = await companyFunctionApi()
    state.clientFnList = res?.client.map(item=>Object.assign(item,{checked: false}))
    state.h5FnList =  res?.h5.map(item=>Object.assign(item,{checked: item.enable === 1}))
    state.faceSystemFnList =res?.face_system.map(item=>Object.assign(item,{checked: false}))
    state.adminFnList = res?.admin.map(item=>Object.assign(item, {checked: true}))
    console.log('功能')
}
//所有设备类型
const  getClientTypeList = async ()=>{
    const res = await allClientTypeApi()
    state.clientTypeList = res ?? []
    console.log('设备')
}
const getCompanyDetail = async (id)=>{

    const res = await companyDetailApi(id)
    console.log(res,'res');
    state.formModel.company_name = res?.company_name
    state.formModel.company_no = res?.company_no
    state.formModel.client_pay_system = res?.client_pay_system
    state.formModel.admin_user_id = res?.admin_user_id
    state.formModel.import_nutriment_status = `${res?.import_nutriment_status}`
    state.formModel.pay_system_id = res?.pay_system_id
    state.formModel.secret_key = res?.secret_key
    state.formModel.pay_system_ip = res?.pay_system_ip
    state.formModel.jsapi_pay_system = res?.jsapi_pay_system
    state.formModel.password=res?.password
    try {
        state.formModel.diy_canteen = res?.company_canteen_function.enable == 2 ?  {enable: false, data: ''} : {enable: true, data: JSON.parse(res?.company_canteen_function.data)}
    }catch (e) {
        state.formModel.diy_canteen = {enable: false, data: ''}
    }
    try {
        const client = deepCopy(res?.company_client_function)
        state.formModel.addDivClient = client.enable == 2 ? {enable: false, list: []} : {enable: true, list: JSON.parse(client.data) }
    }catch (e) {
        state.formModel.addDivClient = {enable: false, list: []}
    }
    console.log('get_face_system',res)
    console.log('get_face_system',res.get_face_system)
    const get_face_system = deepCopy(res?.get_face_system)
    state.faceSystemFnList  = state.faceSystemFnList.map(item=>Object.assign(item, {
        checked: get_face_system.find(x=>x.code === item.code) !== undefined ? true : false
    }))
    const mini_function = deepCopy(res?.mini_function)
    state.h5FnList  = state.h5FnList.map(item=>Object.assign(item, {
        checked: mini_function.find(x=>x.code === item.code) !== undefined ? true : item.checked
    }))
    const admin_function = deepCopy(res?.admin_function)
    state.adminFnList = state.adminFnList.map(item=>Object.assign(item, {
        checked: admin_function.find(x=>x.id === item.id) !== undefined ? true : false
    }))
    const  get_client_fun_per = deepCopy(res?.get_client_fun_per)
    state.clientFnList  = state.clientFnList.map(item=>Object.assign(item, {
        checked: get_client_fun_per.find(x=>x.id === item.id) !== undefined ? true : false
    }))
    console.log('详情是',res)
}

const  addClient =()=> {
    state.formModel.addDivClient.list.push({
        id: '',
        value: ''
    })
}
const  delClient = (index) => {
    state.formModel.addDivClient.list.splice(index,1)
}
const init = async ()=>{
    await getAdminUserList()
    await getPaySystemList()
    await getCompanyFunction()
    await getClientTypeList()
    await getCompanyDetail(router.currentRoute.value.params.id)
}
const  handelClientList = (list)=> {
    let newList =  []
    deepCopy(list).forEach(item=>{
        if(newList.find(x=>x.id === item.id) === undefined) {
            newList.push(item)
        }
    })
    newList = newList.map(item=>{
        return {
            id: item.id,
            value: deepCopy(list).filter(x=>x.id === item.id).reduce((prev,next)=>prev + Number(next.value),0)
        }
    })
    return newList
}
const reset = () =>{
    companyFormRef.value.resetFields()
    init()
}
const submit = ()=>{
    companyFormRef.value.validate(async valid=>{
        if(!valid) {
            return
        }
        const  addDivClient = state.formModel.addDivClient.enable === false ? {enable: 2,data: []} :
            {enable: 1,data: handelClientList(state.formModel.addDivClient.list)}
        const obj =  {
            admin_user_id: state.formModel.admin_user_id,
            // company_no: this.companyModel.company_no,
            company_name: state.formModel.company_name,
            pay_system_ip: state.formModel.pay_system_ip === '' ? undefined : state.formModel.pay_system_ip,
            pay_system_id: state.formModel.pay_system_id,
            import_nutriment_status: state.formModel.import_nutriment_status,
            jsapi_pay_system: state.formModel.jsapi_pay_system,
            client_pay_system: state.formModel.client_pay_system,
            secret_key: state.formModel.secret_key === '' ? undefined  : state.formModel.secret_key,
            function_h5: state.h5FnList.filter(item=>item.checked === true).map(item=>item.code),
            function_client: state.clientFnList.filter(item=>item.checked === true).map(item=>item.id),
            function_admin: state.adminFnList.filter(item=>item.checked === true).map(item=>item.id),
            diy_canteen: state.formModel.diy_canteen.enable === true ? {enable: 1, data: state.formModel.diy_canteen.data} :  {enable : 2, data: ''},
            diy_client: addDivClient,
            face_system: state.faceSystemFnList.filter(item=>item.checked === true).map(item=>item.code),
            password:state.formModel.password
        }
        const res = await updateCompanyApi(state.updateId, obj)
        if(Object.keys(res ?? {}).length >0) {
            ElMessage.success({
                message: '更新成功',
                showClose: true
            })
            if(store?.state?.tagsList) {
                const newTagList = deepCopy(store?.state?.tagsList).filter(item=>item.name !== 'Company')
                store.commit('closeTagsOther',reactive(newTagList))
            }
            router.push({
                name: 'Company',
                query:{
                    keyWords:router.currentRoute.value.query.keyWords,
                    pageIndex:router.currentRoute.value.query.pageIndex,
                    pageSize:router.currentRoute.value.query.pageSize
                }
            })
        }
        console.log('res',res)
    })
}
const goBack = ()=>{
    router.push({ 
        name: 'Company'
    })
}

const main = ()=>{
    onMounted(()=>{
        state.updateId = router.currentRoute.value.params.id
        init()
        console.log('router',router.currentRoute.value.params)
    })
    const newState = toRefs(state)
    return {
        ...newState,
        addClient,
        delClient,
        reset,
        submit,
        goBack
    }
}

export  {
    main,
    companyFormRef
}
