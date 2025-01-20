<template>
  <div>
    <el-form
      ref="formRef"
      size="small"
      :model="formParams"
      :rules="formRules"
      label-width="80px"
    >
      <el-form-item label="设备类型" prop="checkedPattern">
        <el-checkbox-group v-model="formParams.checkedPattern">
          <el-checkbox style="display: block;" v-for="item in clientModelMiniList"  
            :label="item.id"
            :key="item.id"
            v-model="item.checked">{{item.name + `  (${item.code})`}}
            </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { main } from "@/hooks/client/clientTypeRelevancy/update.js";
export default {
  name: "Update",
  props: {
    detail: {
      type: Object,
      require: true,
    },
  },
  setup(props,{emit}) {
    return {
      ...main(props,emit),
    };
  },
};
</script>
<style lang="scss" scoped></style>
