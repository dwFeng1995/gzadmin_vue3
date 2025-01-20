const handelRouter = (routerStr)=>{
    if(!routerStr) {
        return  ['null']
    }
    if (routerStr.indexOf('\r\n') !== -1) {
        return  routerStr.split('\r\n')
    }
    else if(routerStr.indexOf('\n') !== -1) {
        return  routerStr.split('\n')
    }else {
        return [routerStr]
    }
}

export  default  handelRouter
