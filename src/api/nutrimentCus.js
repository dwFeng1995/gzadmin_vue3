import service from '@/utils/request'


const getNutrimentCusList = (params)=> {
    return service({
        url: 'admin/nutriment/nutrimentCus',
        method: 'get',
        params
    })
}

const createNutrimentCus = (data)=> {
    return service({
        url: 'admin/nutriment/nutrimentCus',
        method: 'post',
        data
    })
}

const updateNutrimentCus = (data, id)=> {
    return service({
        url: `admin/nutriment/nutrimentCus/${id}`,
        method: 'put',
        data
    })
}

const deleteNutrimentCus = (id)=> {
    return service({
        url: `admin/nutriment/nutrimentCus/${id}`,
        method: 'delete'
    })
}


const getNutrimentCusDetail = (id)=> {
    return service({
        url: `admin/nutriment/nutrimentCus/${id}`,
        method: 'get'
    })
}

export  {
    getNutrimentCusList as getNutrimentCusListApi,
    createNutrimentCus as createNutrimentCusApi,
    updateNutrimentCus as updateNutrimentCusApi,
    deleteNutrimentCus as deleteNutrimentCusApi,
    getNutrimentCusDetail as getNutrimentCusDetailApi
}
