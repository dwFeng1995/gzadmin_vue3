<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="80px">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="系统名称" prop="code">
                <el-input v-model.trim="formParams.code" placeholder="请输入系统名称" ></el-input>
            </el-form-item>
            <el-form-item label="模型文件" prop="model">
                <el-input v-model.trim="formParams.model" placeholder="请输入模型文件" ></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remrak">
                <el-input v-model.trim="formParams.remrak" placeholder="请输入备注" ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import  {main, formParams, formRef } from '@/hooks/faceSystem/update.js'
    import  formRules from '@/hooks/faceSystem/formRules.js'
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
