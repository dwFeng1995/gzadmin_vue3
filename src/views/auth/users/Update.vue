<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="80px" size="mini">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="username">
                <el-input v-model.trim="formParams.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input  type="password"  show-password v-model.trim="formParams.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="启用状态" prop="is_on">
                <el-switch v-model="formParams.is_on" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams} from '@/hooks/auth/users/update.js'
    import formRules from '@/hooks/auth/users/formRules'
    export default {
        name: "Update",
        props: {
            detail: {
                type: Object,
                default: ()=>{}
            }
        },
        setup(props, {emit}) {
            return {
                formRef,
                formParams,
                formRules,
                ...main(props, emit)
            }
        }
    }
</script>

<style scoped>

</style>
