<template>
    <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
        <el-form-item label="完整设备编号" prop="device_no_complete">
            <el-input v-model.trim="formParams.device_no_complete" placeholder="请输入完整设备编号" disabled ></el-input>
        </el-form-item>
        <el-form-item label="设备编号" prop="device_no">
            <el-input v-model.trim="formParams.device_no" placeholder="请输入设备编号" maxlength="2" ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" prop="device_name">
            <el-input v-model.trim="formParams.device_name" placeholder="请输入设备名称" ></el-input>
        </el-form-item>
        <el-form-item label="食堂名称" prop="canteen_id">
            <el-select class="w-100" filterable  clearable  v-model="formParams.canteen_id" placeholder="请选择食堂">
                <el-option
                        v-for="item in canteenMiniList"
                        :key="item.id"
                        :label="item.canteen_name"
                        :value="item.id">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="启用状态" prop="is_on">
            <el-switch v-model="formParams.is_on" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model.trim="formParams.remark" placeholder="请输入备注"  ></el-input>
        </el-form-item>
    </el-form>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/clientWeigh/update.js'
    export default {
        name: "Update",
        props: {
            detail: {
                required: true,
                type: Object,
                default: ()=> {}
            }
        },
        setup(props, {emit}) {
            return {
                ...main(props, emit),
                formParams,
                formRef,
                formRules,
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
