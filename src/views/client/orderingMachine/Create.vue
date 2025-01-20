<template>
  <div>
    <el-form
      ref="formRef"
      size="small"
      :model="formParams"
      :rules="detail.company?formRulesEdit:formRules"
      label-width="100px"
    >
      <el-form-item label="企业名称" prop="client_company_id">
        <el-select
          :disabled="detail.company"
          class="w-100"
          filterable
          clearable
          v-model="formParams.client_company_id"
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
      <el-form-item label="设备编号" prop="client_no" required>
        <el-input
          :disabled="detail.company"
          v-model.trim="formParams.client_no"
          placeholder="请输入设备编号"
          maxlength="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="设备名称" prop="client_name">
        <el-input
          v-model.trim="formParams.client_name"
          placeholder="请输入设备名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="介绍语" prop="introduce">
        <el-input
          v-model.trim="formParams.introduce"
          placeholder="请输入介绍语"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜品展示模式" prop="show_type">
        <el-radio-group v-model="formParams.show_type">
          <el-radio-button label="2">有图模式</el-radio-button>
          <el-radio-button label="1">无图模式</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="启用状态" prop="status">
        <el-switch
          v-model="formParams.status"
          active-color="#13ce66"
          inactive-color="#d4d9e1"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model.trim="formParams.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  main,
  formParams,
  formRulesEdit,
  formRef,
  formRules,
} from "@/hooks/client/orderingMachine/create.js";
export default {
  name: "Create",
  props: {
    detail: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit }) {
    return {
      ...main(props, emit),
      formParams,
      formRef,
      formRules,
      formRulesEdit
    };
  },
};
</script>

<style scoped></style>
