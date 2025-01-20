<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="设备类型" prop="client_type">
                <el-input v-model.trim="formParams.client_type" placeholder="请输入设备类型" ></el-input>
            </el-form-item>
            <el-form-item label="设备名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入设备名称" ></el-input>
            </el-form-item>
            <el-form-item label="启用状态" prop="isshow">
                <el-switch v-model="formParams.isshow" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="formParams.remark" placeholder="请输入备注"  ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/clientType/update.js'
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
