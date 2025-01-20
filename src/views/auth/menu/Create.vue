<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="100px" size="mini">
            <el-form-item prop="parent_id" label="父级">
                <el-select class="w-100" v-model="formParams.parent_id" placeholder="请选择父级">
                    <el-option
                            v-for="item in parentList"
                            :key="item.id"
                            :label="item.title"
                            :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="菜单名称" prop="title">
                <el-input v-model.trim="formParams.title" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input v-model.number="formParams.order" placeholder="请输入排序"></el-input>
            </el-form-item>
            <el-form-item label="Vue路由name" prop="route_name">
                <el-input  v-model.trim="formParams.route_name" placeholder="请输入Vue路由name"></el-input>
            </el-form-item>
            <el-form-item label="前端路由路径" prop="uri">
                <el-input  v-model.trim="formParams.uri" placeholder="请输入前端路由路径"></el-input>
            </el-form-item>
            <el-form-item label="是否隐藏路由" prop="is_hidden">
                <el-switch v-model="formParams.is_hidden" active-color="#13ce66" inactive-color="#d4d9e1"  :active-value="1" :inactive-value="0" />
            </el-form-item>
<!--            <el-form-item label="菜单图标" prop="icon">-->
<!--                <el-input v-model.trim="formParams.icon" placeholder="请输入前端菜单图标"></el-input>-->
<!--            </el-form-item>-->
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams} from '@/hooks/auth/menu/create'
    import formRules from '@/hooks/auth/menu/formRules'
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
                formRef,
                formParams,
                formRules,
                ...main(emit)
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
