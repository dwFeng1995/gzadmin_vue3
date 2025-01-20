<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="设备编号" prop="client_no">
                <el-input v-model.trim="formParams.client_no" placeholder="请输入设备编号" maxlength="2"></el-input>
            </el-form-item>
            <el-form-item label="食堂名称" prop="canteen_id">
                <el-select filterable class="w-100"  clearable  v-model="formParams.canteen_id" placeholder="请选择食堂">
                    <el-option
                            v-for="item in canteenMiniList"
                            :key="item.id"
                            :label="item.canteen_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备类型" prop="client_type_id">
                <el-select filterable class="w-100"  clearable  v-model="formParams.client_type_id" placeholder="请选择设备类型">
                    <el-option
                            v-for="item in clientTypeMiniList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="默认显示" prop="client_model_id">
                <el-select filterable class="w-100" clearable  v-model="formParams.client_model_id" placeholder="请选择默认显示">
                    <el-option
                            v-for="item in clientModelMiniList"
                            :key="item.id"
                            :label="item.text"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="设备名称" prop="client_name">
                <el-input v-model.trim="formParams.client_name" placeholder="请输入设备名称" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="formParams.remark" placeholder="请输入备注" ></el-input>
            </el-form-item>
            <el-form-item label="是否默认" prop="is_default">
                <el-switch v-model="formParams.is_default" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="启用状态" prop="status">
                <el-switch v-model="formParams.status" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/canteenClient/create.js'
    export default {
        name: "Create",
        setup(props, {emit}) {
            return {
                ...main(emit),
                formParams,
                formRef,
                formRules,
            }
        }
    }
</script>

<style scoped>

</style>
