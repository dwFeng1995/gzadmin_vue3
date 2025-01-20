<template>
    <div>
        <el-form ref="updateFormRef" :model="updateParams" size="small" :rules="formRules" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input disabled v-model.trim="updateParams.username" placeholder="请输入用户名"  />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model.trim="updateParams.password" placeholder="请输入密码"  type="password" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model.trim="updateParams.phone" placeholder="请输入手机号"  />
            </el-form-item>
            <el-form-item label="用户类型" prop="user_type">
                <el-select disabled v-model="updateParams.user_type" placeholder="请选择用户类型" class="w-100">
                    <el-option v-for="item in userTypeList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item label="启用状态">
                <el-switch v-model="updateParams.is_on" active-color="#13ce66" inactive-color="#d4d9e1" :active-value="1" :inactive-value="0"/>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { userTypeList, formRules, updateParams, updateFormRef} from '@/hooks/companyManager/adminUser.js'
export default {
    name: "Update",
    setup(props, {emit}) {
        const submit = () =>{
            emit('submitUpdate', updateParams)
        }
        return {
            userTypeList,
            formRules,
            updateParams,
            updateFormRef,
            submit
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
