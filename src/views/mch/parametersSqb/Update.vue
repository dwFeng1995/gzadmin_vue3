<template>
    <div>
        <el-form
        size="small"
        :model="formParams"
        label-width="120px"
        :rules="formRules"
        ref="formRef">
        <PlatformMerchantTips />
        <el-form-item prop="company_id" label="企业名称">
            <el-select
                disabled
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
                :value="item.id">
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
            <el-input v-model.trim="formParams.terminal_sn" readonly placeholder="不可填、通过接口激活、签到"  />
        </el-form-item>
        <el-form-item  label="终端密钥">
            <el-input v-model.trim="formParams.terminal_key"  readonly placeholder="不可填、通过接口激活、签到" />
        </el-form-item>
        <el-form-item  label="是否激活">
            <div>
                <el-radio disabled v-model="formParams.has_activate" :label="1" size="large">激活状态</el-radio>
                <el-button :disabled="formParams.has_activate === 1" type="primary" @click="activateDialogVisible = true" class="ml-14" size="mini">激活</el-button>
            </div>
        </el-form-item>
        <el-form-item  label="签到日期">
            <el-input v-model.trim="formParams.checkin_at"  readonly  />
        </el-form-item>
        <el-form-item prop="remark" label="备注">
            <el-input v-model.trim="formParams.remark" />
        </el-form-item>
        </el-form>
        <div>
            <el-dialog
                v-model="activateDialogVisible"
                :title="`${formParams.name}激活`"
                @close="activateDialogClosed"
                width="500px" append-to-body :close-on-click-modal="false">
                <div>
                    <el-form size="small" ref="activateFormRef" :rules="activateFormRules" :model="activateFormParams" label-width="80px">
                        <el-form-item label="激活码" prop="code">
                            <el-input v-model.trim="activateFormParams.code" placeholder="输入激活码"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button size="mini" type="primary" @click="activateHandel()">激活</el-button>
                        <el-button size="mini" @click="activateDialogVisible = false">取消</el-button>
                    </span>
                </template>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { formRef, formParams, main, activateFormParams, activateFormRef, activateFormRules } from "@/hooks/mch/parametersSqb/update.js";
import formRules from "@/hooks/mch/parametersSqb/formRules.js";
import PlatformMerchantTips from "@/components/mch/PlatformMerchantTips.vue";
export default {
    components: {
        PlatformMerchantTips,
    },
    props: {
            detail: {
            required: true,
            type: Object,
            default: () => {},
        },
    },
    setup(props, { emit }) {
        return {
            formRef,
            formParams,
            formRules,
            ...main(props, emit),
            activateFormParams,
            activateFormRef,
            activateFormRules
        }
    }
}
</script>
<style lang="scss" scoped>

</style>