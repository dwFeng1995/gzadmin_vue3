import {reactive, toRefs, onMounted, ref, watch} from  "vue"
import  {getRechargePayTypeListApi, updateCompanyPayTypeH5Api, getCompanyPayNotTypeListApi, createRechargePayTypeApi, deleteRechargePayTypeByTypeIdApi, deleteRechargePayTypeByCompanyIdApi} from '@/api/rechargePayType'
import  {companyMiniListApi} from '@/api/company'
import {ElMessage, ElMessageBox} from "element-plus"

const formRef = ref(null)

const formParams = reactive({
    company_id: '',
    pay_type_id: ''
})

const formRules = {
    company_id: [
        { required: true, message: '请选择企业', trigger: 'change' }
    ],
    pay_type_id: [
        { required: true, message: '请选择支付方式', trigger: 'change' }
    ]
}
const main = ()=>{

    const state = reactive({
        primaryId: '',
        tableData: [],
        pageSize: 10,
        pageIndex: 1,
        pageTotal: 0,
        isQuery: false,
        companyId: '',
        companyMiniList: [],
        createDialogVisible: false,
        companyNoPayTypeList: []
    })
    const newState = toRefs(state)

    const getRechargePayTypeList = async ()=>{
        const res = await getRechargePayTypeListApi({
            page: state.pageIndex,
            page_size: state.pageSize,
            company_id: state.companyId
        })
        state.tableData = res?.data
        state.pageTotal = res?.total
        state.tableData.map(item=>{
           Object.assign(item, {
               pay_list  : item.pay_list.map(pay=>Object.assign(pay, {checked: pay.use_mt === 0 ? false :true}))
           })
        })
        console.error(res)
    }
    const changePageSize = (newPageSize)=>{
        isClickQuery()
        state.pageIndex = 1
        state.pageSize = newPageSize
        getRechargePayTypeList()
    }
    const changePageIndex = (newPageIndex) =>{
        isClickQuery()
        state.pageIndex = newPageIndex
        getRechargePayTypeList()
    }
    const queryData = () =>{
        state.isQuery = true
        state.pageIndex = 1
        getRechargePayTypeList()
    }
    const resetData = () =>{
        state.isQuery = false
        state.companyId = ''
        state.pageIndex = 1
        getRechargePayTypeList()
    }
    const isClickQuery = ()=>{
        if(!state.isQuery) {
            state.companyId = ''
        }
    }
    const changePayTypeH5 = async (id)=> {
       const res = await  updateCompanyPayTypeH5Api(id)
        if(Number(res)>0) {
            ElMessage.success({
                message: '更新成功',
                showClose: true
            })
        }
        getRechargePayTypeList()
    }
    const getCompanyPayNotTypeList = async ()=>{
        const res = await getCompanyPayNotTypeListApi({company_id: formParams.company_id})
        state.companyNoPayTypeList = res ?? []
    }

    watch(()=>formParams.company_id,(newVal, oldVal)=>{
        if(newVal) {
            state.companyNoPayTypeList = []
            getCompanyPayNotTypeList()
        }
        console.log(newVal,oldVal)
    })
    const delPayType = async (id, name) =>{
        const resultConfim =  await ElMessageBox.confirm(
            `是否删除该企业的' ${name} '?`,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).catch(err=>err)
        if(resultConfim !== 'confirm') {
            return  ElMessage.info({
                message: '已取消删除',
                showClose: true
            })
        }
        const res = await deleteRechargePayTypeByTypeIdApi(id)
        if(res) {
            ElMessage.success({
                message: '删除成功！',
                showClose: true
            })
        }
        getRechargePayTypeList()
    }
    const deleteRechargePay = async ({id, company_name})=>{
        const resultConfim =  await ElMessageBox.confirm(
            `此操作将永久 ${company_name} 企业的的支付配置, 是否继续?`,
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        ).catch(err=>err)
        if(resultConfim !== 'confirm') {
            return  ElMessage.info({
                message: '已取消删除',
                showClose: true
            })
        }
        const res = await deleteRechargePayTypeByCompanyIdApi(id)
        if(res) {
            ElMessage.success({
                message: '删除成功！',
                showClose: true
            })
        }
        getRechargePayTypeList()
    }

    const submitCreate = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
           const res = await  createRechargePayTypeApi(formParams)
            if(res) {
                ElMessage.success({
                    message: '添加成功！',
                    showClose: true
                })
            }
            state.createDialogVisible = false
            getRechargePayTypeList()
        })
    }
    const getCompanyMiniList = async ()=>{
        const res = await  companyMiniListApi()
        state.companyMiniList = res ?? []
    }
    const createDialogClosed = ()=>{
        formRef.value.resetFields()
    }
    onMounted(()=>{
        getRechargePayTypeList()
        getCompanyMiniList()
    })
    return {
        ...newState,
        resetData,
        queryData,
        changePageSize,
        changePageIndex,
        changePayTypeH5,
        delPayType,
        createDialogClosed,
        submitCreate,
        deleteRechargePay
    }
}

export  {
    main,
    formRef,
    formParams,
    formRules
}

