import { companyFunctionApi, createCompanyApi } from '@/api/company'
import { allClientTypeApi } from '@/api/clientType'
import { allAdminUserApi } from '@/api/adminUser'
import { allPaySystemApi } from '@/api/paySystem'
import { reactive, onMounted, toRefs, ref } from 'vue'
import { ElMessage } from "element-plus"
import { deepCopy } from '@/utils/object'
import router from '@/router/index'
import store from '@/store/index'

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
        faceSystem: []
      },
      adminUserList: [],
      clientFnList: [],
      h5FnList: [],
      adminFnList: [],
      faceSystemFnList: [],
      paySystemList: [],
      clientTypeList: []
})
  // 下拉框用户
const getAdminUserList = async ()=>{
    const res = await allAdminUserApi()
    state.adminUserList = res ?? []
}
  //下拉框支付系统
const getPaySystemList = async ()=>{
    const res = await allPaySystemApi()
    state.paySystemList = res ?? []
}
//企业功能
 const getCompanyFunction = async ()=>{
     const res = await companyFunctionApi()
     state.clientFnList = res?.client.map(item=>Object.assign(item,{checked: false}))
     state.h5FnList =  res?.h5.map(item=>Object.assign(item,{checked: false}))
     state.faceSystemFnList = res?.face_system.map(item=>Object.assign(item,{checked: false}))
     state.adminFnList = res?.admin.map(item=>Object.assign(item, {checked: true}))
 }
 //所有设备类型
 const  getClientTypeList = async ()=>{
     const res = await allClientTypeApi()
     state.clientTypeList = res ?? []
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
  const submit = () =>{
      companyFormRef.value.validate(async valid=>{
          if(!valid) {
              return
          }
          const  addDivClient = state.formModel.addDivClient.enable === false ? {enable: 2,data: []} :
              {enable: 1,data: handelClientList(state.formModel.addDivClient.list)}
          console.log(addDivClient)
          const obj =  {
              admin_user_id: state.formModel.admin_user_id,
              company_no: state.formModel.company_no,
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
              face_system: state.faceSystemFnList.filter(item=>item.checked === true).map(item=>item.code)
          }
          const res =  await createCompanyApi(obj)
          if(Object.keys(res ?? {}).length >0) {
              ElMessage.success({
                  message: '添加成功',
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
      })
  }
  const reset = ()=>{
      companyFormRef.value.resetFields()
  }
  const goBack = ()=>{
      router.push({
          name: 'Company'
      })
  }
const main = ()=>{
 
    onMounted(()=>{
      getAdminUserList()
      getPaySystemList()
      getCompanyFunction()
      getClientTypeList()
    })
    const newState = toRefs(state)
    return {
        ...newState,
        addClient,
        delClient,
        submit,
        reset,
        goBack
    }
}

export {
    main,
    companyFormRef
}
