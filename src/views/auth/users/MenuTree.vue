<template>
    <div>
        <el-form ref="formRef"  label-width="60px" size="mini">
            <el-form-item label="账号">
                <el-input v-model="username" disabled></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="name" disabled></el-input>
            </el-form-item>
            <el-form-item label="菜单">
                <el-tree ref="treeRef" :props="treeProps"  :default-expanded-keys="defaultExpandedKeys"   :default-checked-keys="defaultCheckedKeys"  :data="treeData" node-key="id"  show-checkbox />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams, treeRef} from '@/hooks/auth/users/menuTree.js'
    export default {
        name: "",
        props: {
            detail: {
                type: Object,
                default: ()=>{}
            },
            userMenu: {
                type: Array,
                default: ()=>[]
            }
        },
        setup(props, {emit}) {
            const treeProps = {
                label: 'title',
                children: 'child'
            }
            return {
                ...main(props, emit),
                formParams,
                formRef,
                treeRef,
                treeProps
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>
