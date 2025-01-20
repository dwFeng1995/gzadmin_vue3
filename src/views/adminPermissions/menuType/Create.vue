<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="80px" size="mini">
            <el-form-item label="名称" prop="menu_type_name">
                <el-input v-model.trim="formParams.menu_type_name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
                <el-input v-model.number="formParams.sort" placeholder="请输入排序"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams} from '@/hooks/adminPermissions/menuType/create'
    import formRules from '@/hooks/adminPermissions/menuType/formRules'
    export default {
        name: "Create",
        setup(props, {emit}) {
            return {
                ...main(emit),
                formRef,
                formParams,
                formRules
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
