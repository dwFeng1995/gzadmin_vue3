import service from '@/utils/request'


const getFaceSystemList = (params)=> {
    return service({
        url: 'admin/face/faceSystem',
        method: 'get',
        params
    })
}

const createFaceSystem = (data)=> {
    return service({
        url: 'admin/face/faceSystem',
        method: 'post',
        data
    })
}

const updateFaceSystem = (data, id)=> {
    return service({
        url: `admin/face/faceSystem/${id}`,
        method: 'put',
        data
    })
}

const deleteFaceSystem = (id)=> {
    return service({
        url: `admin/face/faceSystem/${id}`,
        method: 'delete'
    })
}


const getFaceSystemDetail = (id)=> {
    return service({
        url: `admin/face/faceSystem/${id}`,
        method: 'get'
    })
}

export  {
    getFaceSystemList as getFaceSystemListApi,
    createFaceSystem as createFaceSystemApi,
    updateFaceSystem as updateFaceSystemApi,
    deleteFaceSystem as deleteFaceSystemApi,
    getFaceSystemDetail as getFaceSystemDetailApi
}
