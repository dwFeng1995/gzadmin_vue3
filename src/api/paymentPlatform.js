//支付平台

import service from '@/utils/request'


const getMchPlatformList = (params)=> {
    return service({
        url: 'admin/mch/platform',
        method: 'get',
        params
    })
}

const createMchPlatform = (data)=> {
    return service({
        url: 'admin/mch/platform',
        method: 'post',
        data
    })
}

const updateMchPlatform = (data, id)=> {
    return service({
        url: `admin/mch/platform/${id}`,
        method: 'put',
        data
    })
}

const deleteMchPlatform = (id, data)=> {
    return service({
        url: `admin/mch/platform/${id}`,
        method: 'delete',
        data
    })
}


const getMchPlatformDetail = (id, params)=> {
    return service({
        url: `admin/mch/platform/${id}`,
        method: 'get',
        params
    })
}

//平台默认值
const getPlatformDefault = (params)=> {
    return service({
        url: 'admin/mch/platform-default',
        method: 'get',
        params
    })
}

//上传微信公众号证书
const uploadWetchPublicFile = (data)=>{
    return service({
        url: 'admin/mch/uploadWetchPublicFile',
        method: 'post',
        data
    })
}

//收钱吧激活
const sqbActivation = (data)=>{
    return service({
        url: 'admin/mch/thirdParty/sqbActivation',
        method: 'post',
        data
    })
}

export  {
    getMchPlatformList as getMchPlatformListApi,
    createMchPlatform as createMchPlatformApi,
    updateMchPlatform as updateMchPlatformApi,
    deleteMchPlatform as deleteMchPlatformApi,
    getMchPlatformDetail as getMchPlatformDetailApi,
    getPlatformDefault as getPlatformDefaultApi,
    uploadWetchPublicFile as uploadWetchPublicFileApi,
    sqbActivation as sqbActivationApi
}
