<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="名称" prop="fun_name">
                <el-input v-model.trim="formParams.fun_name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="代号" prop="fun_code">
                <el-input v-model.trim="formParams.fun_code" placeholder="请输入代号" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="formParams.remark" placeholder="请输入备注" ></el-input>
            </el-form-item>
            <el-form-item label="设备类型" prop="client_type">
                <el-checkbox v-for="item in clientTypeMiniList" :label="item.name" :key="item.id" v-model="item.checked" />
                <div  class="el-form-item__error mt-10">至少选择一个设备类型</div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/clientFunction/create.js'
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
