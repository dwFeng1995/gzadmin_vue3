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
          disabled
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
      <el-form-item prop="appid" label="缴费项目">
        <el-input v-model.trim="formParams.appid" />
      </el-form-item>
      <el-form-item prop="mch_id" label="商户号">
        <el-input v-model.trim="formParams.mch_id" />
      </el-form-item>
      <el-form-item prop="secret_key" label="密钥">
        <el-input v-model.trim="formParams.secret_key" />
      </el-form-item>
      <el-form-item prop="shop_id" label="店铺Id">
        <el-input v-model.trim="formParams.shop_id" />
      </el-form-item>
      <el-form-item prop="device_id" label="设备Id">
        <el-input v-model.trim="formParams.device_id" />
      </el-form-item>
      <el-form-item prop="operator_id" label="员工Id">
        <el-input v-model.trim="formParams.operator_id" />
      </el-form-item>
      <el-form-item prop="redirect_url" label="重定向地址">
        <el-input v-model.trim="formParams.redirect_url" />
      </el-form-item>
      <el-form-item prop="mch_sub_id" label=" 二级主商户">
        <el-input v-model.trim="formParams.mch_sub_id" />
      </el-form-item>
      <el-form-item prop="remark" label="备注">
        <el-input v-model.trim="formParams.remark" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { formRef, formParams, main } from "@/hooks/mch/parametersIku/update.js";
import formRules from "@/hooks/mch/parametersIku/formRules.js";
import PlatformMerchantTips from "@/components/mch/PlatformMerchantTips.vue";
export default {
  name: "Update",
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
    };
  },
};
</script>

<style lang="scss" scoped></style>
