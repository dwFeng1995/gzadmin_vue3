import service from '@/utils/request'

const getClientActivationCodeList = (params) => {
    return service({
        url: 'admin/client/activation',
        method: 'get',
        params
    })
}

const addActivationCode = (data) => {
    return service({
        url: 'admin/client/activation',
        method: 'POST',
        data
    })
}
const  deleteActivationCode= (id)=> {
    return service({
        url: `admin/client/activation/${id}`,
        method: 'DELETE',
    })
}

const  getQrCode= (id,params)=> {
    return service({
        url: `admin/client/activation/${id}`,
        method: 'get',
        params
    })
}
export {
    getClientActivationCodeList as getClientActivationCodeApi,
    addActivationCode as addActivationCodeApi,
    deleteActivationCode as deleteActivationCodeApi,
    getQrCode as getQrCodeApi
}