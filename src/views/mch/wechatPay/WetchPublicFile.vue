<template>
    <div>
         <el-form size="small"  :model="formParams" label-width="80px"  :rules="formRules" ref="formRef">
            <el-form-item label="文件名称" prop="name">
                <el-input placeholder="请输入文件名" v-model.trim="formParams.name">
                    <template #append>.txt</template>
                </el-input>
            </el-form-item>
            <el-form-item label="文件内容" prop="text">
                <el-input   type="textarea"   :rows="12" placeholder="请输入证书文件内容" v-model.trim="formParams.text"></el-input>
            </el-form-item>
         </el-form>   
    </div>
</template>
<script>
import {main, formParams, formRef, formRules} from '@/hooks/mch/wechatPay/wetchPublicFile.js'
export default {
    setup(props, {emit}) {
        return {
            ...main(emit),
            formParams,
            formRef,
            formRules
        }
        
    },
}
</script>
<style lang="scss" scoped>

</style>