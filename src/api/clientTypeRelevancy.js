import service from '@/utils/request'
const getClientTypeRelevancyList = (params) => {
    return service({
        url: 'admin/client/type-pay-source',
        method: 'get',
        params
    })
}
const getClientPaySourceMiniList = (params) => {
    return service({
        url: 'admin/client/paySource-mini',
        method: 'get',
        params
    })
}
const editClientPaySource = (id,data) => {
    return service({
        url: `admin/client/type-pay-source/${id}`,
        method: 'PUT',
        data
    })
}
export {
    getClientTypeRelevancyList as getClientTypeRelevancyApi,
    getClientPaySourceMiniList as getClientPaySourceMiniApi,
    editClientPaySource as editClientPaySourceApi
}