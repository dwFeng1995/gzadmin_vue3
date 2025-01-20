import service from '@/utils/request'


const getNutrimentList = (params)=> {
    return service({
        url: 'admin/nutriment/nutriment',
        method: 'get',
        params
    })
}

const createNutriment = (data)=> {
    return service({
        url: 'admin/nutriment/nutriment',
        method: 'post',
        data
    })
}

const updateNutriment = (data, id)=> {
    return service({
        url: `admin/nutriment/nutriment/${id}`,
        method: 'put',
        data
    })
}

const deleteNutriment = (id)=> {
    return service({
        url: `admin/nutriment/nutriment/${id}`,
        method: 'delete'
    })
}


const getNutrimentDetail = (id)=> {
    return service({
        url: `admin/nutriment/nutriment/${id}`,
        method: 'get'
    })
}

export  {
    getNutrimentList as getNutrimentListApi,
    createNutriment as createNutrimentApi,
    updateNutriment as updateNutrimentApi,
    deleteNutriment as deleteNutrimentApi,
    getNutrimentDetail as getNutrimentDetailApi
}
