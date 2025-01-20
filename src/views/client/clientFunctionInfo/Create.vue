<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="代号" prop="code">
                <el-input v-model.trim="formParams.code" placeholder="请输入代号" ></el-input>
            </el-form-item>
            <el-form-item label="数据" prop="data">
                <el-input v-model.trim="formParams.data" placeholder="请输入数据" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model.trim="formParams.remark" placeholder="请输入备注" ></el-input>
            </el-form-item>
            <el-form-item label="设备功能" >
                <el-checkbox v-for="item in clientFunctionMiniList" :label="item.fun_name" :key="item.id" v-model="item.checked" />
                <div  class="el-form-item__error mt-10">至少选择一个设备功能</div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef, formRules } from '@/hooks/client/clientFunctionInfo/create.js'
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

<style lang="scss" scoped>

</style>
