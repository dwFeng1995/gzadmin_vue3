import service from '@/utils/request'
const upgradePromptList = (params)=>{
    return service({
        url: 'admin/software/upgrade/prompt',
        method: 'get',
        params
    })
}
//更新
const updatePrompt = (data, id)=>{
    return service({
        url: `admin/software/upgrade/prompt/${id}`,
        method: 'put',
        data
    })
}


export{
    upgradePromptList as upgradePromptListApi ,
    updatePrompt as updatePromptApi
}