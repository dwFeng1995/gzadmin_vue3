<template>
    <div>
        <el-form ref="formRef" size="small" :model="formParams" :rules="formRules" label-width="60px">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称" ></el-input>
            </el-form-item>
            <el-form-item label="代号" prop="code">
                <el-input v-model.trim="formParams.code" placeholder="请输入代号" ></el-input>
            </el-form-item>
            <el-form-item label="正文" >
                <Tinymce :resize="true" @getContent="getContent" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Tinymce from '@/components/editor/Tinymce'
    import  {main, formParams, formRef } from '@/hooks/agreement/create.js'
    import  formRules from '@/hooks/agreement/formRules.js'
    export default {
        name: "Create",
        components: {
            Tinymce
        },
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

<style  lang="scss" scoped>

</style>
