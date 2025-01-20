//获取服务端签名
import service from '@/utils/request'

const getOssSignature = (params)=>{
    return service({
        url: 'admin/oss/file/parameter',
        method: 'get',
        params
    })
}

export  {
    getOssSignature as getOssSignatureApi
}
