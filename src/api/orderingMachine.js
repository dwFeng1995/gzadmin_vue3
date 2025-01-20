import service from '@/utils/request'

const getOrderingMachineList = (params)=>{
    return service({
        url: 'admin/client/ordering',
        method: 'get',
        params
    })
}

const  addOrderingMachine= (data)=> {
    return service({
        url: 'admin/client/ordering',
        method: 'post',
        data
    })
}
const  editOrderingMachine= (id,data)=> {
    return service({
        url: `admin/client/ordering/${id}`,
        method: 'PUT',
        data
    })
}
const  deleteOrderingMachine= (id)=> {
    return service({
        url: `admin/client/ordering/${id}`,
        method: 'DELETE',
    })
}
export{
    getOrderingMachineList as getOrderingMachineListApi,
    addOrderingMachine as addOrderingMachineApi,
    editOrderingMachine as editOrderingMachineApi,
    deleteOrderingMachine as deleteOrderingMachineApi
}