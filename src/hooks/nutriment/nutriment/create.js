import {reactive, ref, toRefs, onMounted} from "vue"
import  {createNutrimentApi} from '@/api/nutriment'
import  {companyMiniListApi} from '@/api/company'
import {ElMessage} from "element-plus"

//

const formRef= ref(null)
const formParams = reactive({
    name: '',
    energy: '',
    protein: '',
    fat: '',
    carbohydrate: '',
    dietary_fiber: '',
    calcium: '',
    iron: '',
    zinc: '',
    selenium: '',
    company_id: '',
})

const resterForm = ()=>{
    formRef.value.resetFields()
}

const state =  reactive({
    companyMiniList: [
        {
            id: 0,
            company_name: '所有人可见'
        }
    ]
})


const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList  = state.companyMiniList.concat(res ?? [])
}

const main = (emit)=>{
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const res = await createNutrimentApi(formParams)
            if(res === true) {
                ElMessage.success({
                    message: '添加成功',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })
        console.log(formParams.client_type)
        console.log('emit', emit)
    }
    onMounted(()=>{
        getCompanyMiniList()
    })
    const newState = toRefs(state)
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
