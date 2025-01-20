<template>
    <div>
        <el-form ref="formRef" :model="formParams" :rules="formRules" label-width="80px" size="mini">
            <el-form-item label="名称" prop="name">
                <el-input v-model.trim="formParams.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="标识" prop="slug">
                <el-input v-model.trim="formParams.slug" placeholder="请输入标识"></el-input>
            </el-form-item>
            <el-form-item label="路由">
                <el-button type="primary" class="mb-10" size="mini" @click="formParams.http_path.push({value: '/'})">添加</el-button>
                <el-form-item   label-width="2px" v-for="(item, index) in formParams.http_path" :key="index"
                                :prop="'http_path.' + index + '.value'"
                                :rules="{
                                required: true,
                                message: '请输入接口地址',
                                trigger: 'blur' }">
                    <div class="flex-row">
                        <el-input  v-model.item="formParams.http_path[index].value" placeholder="请输入接口地址">
                        </el-input>
                        <el-button class="ml-6"  :disabled="formParams.http_path.length <= 1"
                                   @click="formParams.http_path.splice(index, 1)"       size="mini" type="danger" icon="el-icon-delete" circle>
                        </el-button>
                    </div>
                </el-form-item>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {main, formRef, formParams} from '@/hooks/adminPermissions/permissions/update'
    import formRules from '@/hooks/adminPermissions/permissions/formRules'
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
                ...main(props, emit),
                formRef,
                formParams,
                formRules
            }
        }
    }
</script>

<style scoped>

</style>
