<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="120px" size="mini">
            <el-form-item label="父级菜单" prop="parent_id">
                <el-select class="w-100" filterable v-model="formParams.parent_id" placeholder="请选择父级">
                    <el-option
                            v-for="item in parentList"
                            :key="item.id"
                            :label="`${item.title} -  ${item.name}`"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input v-model.number="formParams.order" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item label="菜单标题" prop="title">
                <el-input v-model.trim="formParams.title" placeholder="请输入菜单标题"></el-input>
            </el-form-item>
            <el-form-item label="前端菜单图标" prop="web_icon">
                <el-input v-model.trim="formParams.web_icon" placeholder="请输入前端菜单图标"></el-input>
            </el-form-item>
            <el-form-item label="vue-route name" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入Vue路由Name"></el-input>
            </el-form-item>
            <el-form-item label="是否隐藏路由" prop="is_hidden">
                <el-switch v-model="formParams.is_hidden" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="Vue路由相对路径" prop="uri">
                <el-input v-model.trim="formParams.uri" placeholder="请输入Vue路由相对路径"></el-input>
            </el-form-item>
            <el-form-item label="Vue route redirect" prop="redirect">
                <el-input v-model.trim="formParams.redirect" placeholder="请输入Vue路由重定向地址"></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="permission">
                <el-select class="w-100" filterable multiple collapse-tags v-model="formParams.permission" placeholder="请选择父级">
                    <el-option
                            v-for="item in permissionsList"
                            :key="item.id"
                            :label="`${item.name}`"
                            :value="item.slug">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单分类" prop="admin_menu_type_ids">
                <el-select class="w-100" filterable multiple collapse-tags  v-model="formParams.admin_menu_type_ids" placeholder="请选择父级">
                    <el-option
                            v-for="item in menuTypeList"
                            :key="item.id"
                            :label="item.menu_type_name"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams} from '@/hooks/adminPermissions/menu/create'
    import formRules from '@/hooks/adminPermissions/menu/formRules'
    export default {
        name: "Create",
        props: {
            parentList: {
                type: Array,
                default: ()=>[]
            }
        },
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

<style scoped>

</style>
