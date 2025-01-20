import service from '@/utils/request'

const allPaySystem = ()=>{
    return service({
        url: 'admin/pay/paysystem-all',
        method: 'get',
    })
}

export  {
    allPaySystem as allPaySystemApi
}
