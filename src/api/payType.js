import service from '@/utils/request'

const allPayType = ()=>{
    return service({
        url: 'admin/mch/payTypeMini',
        method: 'get',
    })
}

export  {
    allPayType as allPayTypeApi
}
