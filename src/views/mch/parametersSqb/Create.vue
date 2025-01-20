<template>
    <div>
        <el-form
        size="small"
        :model="formParams"
        label-width="120px"
        :rules="formRules"
        ref="formRef"
        >
        <PlatformMerchantTips />
        <el-form-item prop="company_id" label="企业名称">
            <el-select
            clearable
            filterable
            class="w-100"
            v-model="formParams.company_id"
            placeholder="请选择企业"
            >
            <el-option
                v-for="item in companyMiniList"
                :key="item.id"
                :label="item.company_name"
                :value="item.id"
            >
            </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="name" label="支付平台商户名称">
            <el-input v-model.trim="formParams.name" placeholder="请输入支付平台商户名称" />
        </el-form-item>
        <el-form-item prop="appid" label="appid">
            <el-input v-model.trim="formParams.appid" />
        </el-form-item>
        <el-form-item prop="vendor_sn" label="服务商序列号">
            <el-input v-model.trim="formParams.vendor_sn" />
        </el-form-item>
        <el-form-item prop="vendor_key" label="服务商密钥">
            <el-input v-model.trim="formParams.vendor_key" />
        </el-form-item>
        <el-form-item  label="终端号">
            <el-input readonly placeholder="不可填、通过接口激活、签到" />
        </el-form-item>
        <el-form-item  label="终端密钥">
            <el-input readonly placeholder="不可填、通过接口激活、签到" />
        </el-form-item>
        <el-form-item prop="remark" label="备注">
            <el-input v-model.trim="formParams.remark" />
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { formRef, formParams, main } from "@/hooks/mch/parametersSqb/create.js"
import formRules from "@/hooks/mch/parametersSqb/formRules.js"
import PlatformMerchantTips from "@/components/mch/PlatformMerchantTips.vue"
export default {
    components: {
       PlatformMerchantTips 
    },
    setup(props, { emit }) {
        return {
            ...main(emit),
            formRef,
            formParams,
            formRules
        }
    },
}
</script>
<style lang="scss" scoped>

</style>