<template>
    <div>
        <el-form size="small"  :model="formParams" label-width="120px"  :rules="formRules" ref="formRef">
            <PlatformMerchantTips />
            <el-form-item prop="company_id" label="企业名称">
                <el-select  clearable filterable class="w-100" v-model="formParams.company_id" placeholder="请选择企业">
                    <el-option
                            v-for="item in companyMiniList"
                            :key="item.id"
                            :label="item.company_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
             <el-form-item prop="name" label="支付平台商户名称">
                <el-input   v-model.trim="formParams.name"  placeholder="请输入支付平台商户名称" />
            </el-form-item>
            <div class="w-100 flex-row  align-center">
                <div class="w-50">
                    <el-form-item prop="appid" label="缴费编号">
                        <el-input    v-model.trim="formParams.appid" ></el-input>
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item prop="item_code" label="支付项">
                        <el-input   v-model.trim="formParams.item_code" />
                    </el-form-item>
                </div>
            </div>
            <div class="w-100 flex-row align-center">
                <div class="w-50">
                    <el-form-item prop="aes_iv" label="aes_iv">
                        <el-input   v-model.trim="formParams.aes_iv" />
                    </el-form-item>
                </div>
                <div class="w-50">
                    <el-form-item prop="aes_key" label="aes_key">
                        <el-input   v-model.trim="formParams.aes_key" />
                    </el-form-item>
                </div>
            </div>
            <el-form-item prop="remark" label="备注">
                <el-input   v-model.trim="formParams.remark" />
            </el-form-item>
            <el-form-item label="加密私钥" prop="private_key_path">
                <el-input   v-model.trim="formParams.private_key_path" />
            </el-form-item>
            <el-form-item label="解密公钥" prop="public_key_path">
                <el-input   v-model.trim="formParams.public_key_path" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  { main, formRef, formParams}  from '@/hooks/mch/parametersPci/create.js'
    import formRules from '@/hooks/mch/parametersPci/formRules.js'
    import PlatformMerchantTips from '@/components/mch/PlatformMerchantTips.vue'
    export default {
        name: "Create",
        components: {
            PlatformMerchantTips
        },
        setup(props, {emit}) {
            return {
                ...main(emit),
                formRef,
                formParams,
                formRules
            }
        }
    }
</script>

<style scoped>

</style>
