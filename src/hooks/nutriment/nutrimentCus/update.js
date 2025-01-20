import {reactive, ref, onMounted, toRefs} from "vue"
import  {updateNutrimentCusApi} from '@/api/nutrimentCus'
import  {companyMiniListApi} from '@/api/company'
import {ElMessage} from "element-plus"
import {deepCopy} from "@/utils/object"


const formRef= ref(null)

const formParams = reactive({
    id: '',
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


const state =  reactive({
    companyMiniList: []
})

const resterForm = ()=>{
    formRef.value.resetFields()
}

const getCompanyMiniList = async ()=>{
    const res = await  companyMiniListApi()
    state.companyMiniList  = res ?? []
}


const main = (props, emit)=>{
    console.log('emit', emit)
    console.log('props', props.detail)
    const submitForm = ()=>{
        formRef.value.validate(async valid=>{
            if(!valid) {
                return
            }
            const formData = deepCopy(formParams)
            formData.id = undefined
            const res = await updateNutrimentCusApi(formData, formParams.id)
            if(Number(res) >0 ) {
                ElMessage.success({
                    message: '更新成功！',
                    showClose: true
                })
                emit('refreshData', true)
            }
        })

    }
    const initDetail =  async ()=>{
        await  getCompanyMiniList()
        formParams.id = props?.detail?.id
        formParams.name = props?.detail?.name
        formParams.energy = props?.detail?.energy
        formParams.protein = props?.detail?.protein
        formParams.fat = props?.detail?.fat
        formParams.carbohydrate = props?.detail?.carbohydrate
        formParams.dietary_fiber = props?.detail?.dietary_fiber
        formParams.calcium = props?.detail?.calcium
        formParams.iron = props?.detail?.iron
        formParams.zinc = props?.detail?.zinc
        formParams.selenium = props?.detail?.selenium
        formParams.company_id = props?.detail?.company_id

    }

    onMounted(()=>{
        initDetail()
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
